 const noteModel = require("../../Models/NoteSchema");

 module.exports = (app) => {
   app.get("/getNotes", (req, res) => {
     noteModel.find(function (err, articles) {
       return res.send(articles);
     });
	});

    app.get("/", (req, res) => {
       req.send("Hello World");
    });
	 
	 
	app.post("/addNote",async (req,res) =>{
		let note = new noteModel(req.body);
		await note.save();
		res.send((note));
	});
	
	app.delete("/deleteNote",async (req,res) =>{
		const response = await noteModel.deleteOne({"_id":req.body});
		res.send(response.data);

	});

 };
