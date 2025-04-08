from config import Get_db_connection
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import re 
from  typing import Optional
import uuid


app = FastAPI()

@app.post("/")
def home():
    return {"message":{"Welcome to Book Store"}}


@app.get("/dashboard")
def dashboard():
    conn = Get_db_connection()
    cursor = conn.cursor()

    try:
        query_get_item_shelf = """
            select * from shelf;
        """
        cursor.execute(query_get_item_shelf)
        response_item_shelf = cursor.fetchall()

        column_names = [desc[0] for desc in cursor.description]

        response_item_shelf = [dict(zip(column_names, row)) for row in response_item_shelf]

        return {"data": response_item_shelf}

    
    except Exception as e:
        raise HTTPException(status_code=404,detail=str(e))
    finally:
        conn.close()
        cursor.close()

# 1: Display/record
class filter(BaseModel):
    genre: Optional[str] = None,
    status: Optional[str] = None,
    page_size: int = 10,
    page: int = 0,
@app.post("/shelf/")
async def get_details(object: filter):
    '''
    Display Feature, to display the books in the store  
    param : none
    '''
    conn = Get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = f"select * from shelf where 1=1"
        offset = (object.page-1)*object.page_size
        params = []
        if object.genre is None:
            query += ""
        else:
            query += " and genre = %s"
            params.append(object.genre)
        if object.status is None:
            query += ""
        else:
            query += " and status = %s"
            params.append(object.status)
        query += " limit %s offset %s"
        params.extend([object.page_size,offset])

        cursor.execute(query,tuple(params))
        # conn.commit()
        response = cursor.fetchall()
        return {"response":response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    finally:
        cursor.close()
        conn.close()



class CartItem(BaseModel):
    product_id: int 
    action: str

@app.post("/cart/update")
async def update_cart(item: CartItem):
    conn = Get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT product_id, product, price, status FROM shelf WHERE product_id = %s", (item.product_id,))
        product_details = cursor.fetchone()

        if not product_details:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found in shelf.")

        cursor.execute("select quantity,status from record where product_id = %s",(item.product_id,))
        record_quantity_check = cursor.fetchone() 
        if not record_quantity_check:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found in shelf.")

        check_cart_query = "SELECT quantity FROM cart WHERE product_id = %s"
        cursor.execute(check_cart_query, (item.product_id,))
        cart_item = cursor.fetchone() or {}

        if item.action == "add":
            if cart_item:
                if ((record_quantity_check["status"]=="available") and record_quantity_check["quantity"] > cart_item["quantity"]):
                    update_query = "update cart set quantity = quantity + 1 where product_id = %s"
                    cursor.execute(update_query, (item.product_id,))

                elif (record_quantity_check["status"]=="booked" ):
                    raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} already booked.")

                elif (record_quantity_check["status"]=="out_of_stock" ):
                    raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} is Out Of Stock.")

                elif  (record_quantity_check["quantity"] <= cart_item["quantity"]):
                    update_record_quantity = "update record set status = %s where product_id = %s"
                    cursor.execute(update_record_quantity,("booked",item.product_id,))
                    update_record_quantity = "update shelf set status = %s where product_id = %s"
                    cursor.execute(update_record_quantity,("booked",item.product_id,))
            else:
                insert_query = """
                    INSERT INTO cart (product_id, product, price, quantity)
                    VALUES (%s, %s, %s, %s)
                """
                cursor.execute(insert_query, 
                (
                    product_details["product_id"], 
                    product_details["product"], 
                    product_details["price"], 
                    1
                ))


        elif item.action == "remove":
            if cart_item and cart_item["quantity"] > 1:
                update_query = "UPDATE cart SET quantity = quantity - 1 WHERE product_id = %s"
                cursor.execute(update_query, (item.product_id,))
                update_record_quantity = "update record set status = %s where product_id = %s"
                cursor.execute(update_record_quantity,("available", item.product_id,))
                update_record_quantity = "update shelf set status = %s where product_id = %s"
                cursor.execute(update_record_quantity,("available",item.product_id,))

            elif cart_item and cart_item["quantity"] == 1:
                delete_query = "DELETE FROM cart WHERE product_id = %s"
                cursor.execute(delete_query, (item.product_id,))
                update_record_quantity = "update record set status = %s where product_id = %s"
                cursor.execute(update_record_quantity,("available", item.product_id,))
                update_record_quantity = "update shelf set status = %s where product_id = %s"
                cursor.execute(update_record_quantity,("available",item.product_id,))
            else:
                raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found in cart.")
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Use 'add' or 'remove'.")

        conn.commit()
        cursor.execute("SELECT * FROM cart")
        updated_cart = cursor.fetchall()
        return {"message": f"Cart updated successfully.", "cart": updated_cart}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    finally:
        cursor.close()
        conn.close()




class CheckoutRequest(BaseModel):
    user_id: Optional[str] = None

@app.post("/checkout")
async def checkout(request: CheckoutRequest):
    conn = Get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        transaction_id = str(uuid.uuid4())
        conn.start_transaction()

        cursor.execute("SELECT * FROM cart")
        cart_items = cursor.fetchall()
        if not cart_items:
            raise HTTPException(status_code=400, detail="Cart is empty")

        total = 0
        for item in cart_items:
            cursor.execute("""
                SELECT quantity 
                FROM record 
                WHERE product_id = %s
            """, (item["product_id"],))
            record = cursor.fetchone()
            
            if not record:
                raise HTTPException(status_code=404, detail=f"Product {item['product_id']} not found in inventory")
                
            if record["quantity"] < item["quantity"]:
                raise HTTPException(status_code=400, detail=f"Insufficient stock for product {item['product_id']}")

            total += item["price"] * item["quantity"]

        for item in cart_items:
            
            cursor.execute("""
                INSERT INTO transaction 
                (transaction_id, user_id, product_id, product, quantity, total_price)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                transaction_id,
                request.user_id,
                item["product_id"],
                item["product"],
                item["quantity"],
                item["price"] * item["quantity"]
            ))

            cursor.execute("""
                UPDATE record 
                SET quantity = quantity - %s,
                    status = CASE 
                        WHEN (quantity - %s) <= 0 THEN 'out_of_stock' 
                        ELSE status 
                    END
                WHERE product_id = %s
            """, (
                item["quantity"], 
                item["quantity"], 
                item["product_id"]
            ))

            cursor.execute("""
                UPDATE shelf 
                SET  status= %s
                WHERE product_id = %s
            """, (
                "out_of_stock",
                item["product_id"],
            ))

        cursor.execute("DELETE FROM cart")
        
        conn.commit()
        return {"message": "Checkout successful", "total": total, "transaction_id": transaction_id}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Transaction failed: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@app.get("/transactions")
async def get_transactions(user_id: Optional[int] = None):
    conn = Get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        if user_id:
            cursor.execute("SELECT * FROM transaction WHERE user_id = %s", (user_id,))
        else:
            cursor.execute("SELECT * FROM transaction")
        transactions = cursor.fetchall()
        return {"transactions": transactions}
    finally:
        cursor.close()
        conn.close()
