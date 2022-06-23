
const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static('abc'));

let dbparam={
			host: 'localhost',
			user: 'root',
			password: 'cdac',
			database: 'pleasework',
			port:3306
			}
    
			const conn=mysql.createConnection(dbparam);
		app.get('/add', (req, resp)=> {
			let bookid=req.query.bookid;
			let bookname=req.query.bookname;
			let price=req.query.price;
			let bookdetail ={ bookid:0,bookname:"",price:0} 
			let output={status:false}
			conn.query('insert into book values(?,?,?)',[bookid,bookname,price],

			(error,res)=>{
				if(error)
				{
					console.log("can't not insert");
				}
				else 
				{
					if(res.affectedRows>0)
					{
						console.log("inserted");
						output.status=true;
						

					}
					
				}
				resp.send(output);
			});
			
		});

		app.get('/show', (req, resp)=> {
			let bookid=req.query.bookid;
			let bookname=req.query.bookname;
			let price=req.query.price;
		
			let output ={status:false,bookdetail:{ bookid:0,bookname:"",price:0} }
			conn.query('select bookid,bookname,price  from book',[bookid,bookname,price],

			(error,rows)=>{
				if(error)
				{
					console.log("can't not insert");
				}
				else 
				{
					if(rows>0)
					{
						console.log("show table");
						output.status=true;
						output.bookdetail=rows[0];

					}
					
				}
				resp.send(output);
			});
			
		});

			
     




app.listen(800,()=>{
    console.log("server listening at port 8081...");
});