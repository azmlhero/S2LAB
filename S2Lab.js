$(function(){
    reqajex();
    $("#recipes").on("click",".btn-danger",handledel);
    $("#btn").click(addproduct);
    $("#btnsingle").click(addtodo);
    $("#recipes").on("click",".btn-warning",handleedit);
    
    $("#save").click(function(){
        var userID=$("#useridadd").val();
        var title1=$("#titleadd").val();
        var completed=$("#Completedadd").val();
       
$.ajax({
    url:"https://jsonplaceholder.typicode.com/todos",
    method:"POST",
    data:{userID,title1,completed},
    success:function (result){
        console.log(result);
    reqajex();
    $("#addmodel").modal("hide");
    },
});
    });


    $("#UpdatedSave").click(function() {
        var id = $("#updateId").val();
        var userID2=$("#userid").val();
        var title2=$("#title").val();
        var completed2=$("#Completed").val();
       
        $.ajax({
          url: "https://jsonplaceholder.typicode.com/todos/"+id,
          data: { userID2,title2,completed2},
          method: "PUT",
          success: function() {
            
            reqajex();
            $("#updatemodle").modal("hide");
          }
        });
      });
    });
    

    
    
       
    
    
    
    
    function handleedit(){
        var btn=$(this);
        var parent=btn.closest(".product");
        let id=parent.attr("data-id");
        $.get("https://jsonplaceholder.typicode.com/todos/"+id,function(result){
            $("#updateId").val(result.id);
    
            $("#userid").val(result.userId);
            $("#title").val(result.title);
            $("#Completed").val(result.completed);
            
            $("#updatemodle").modal("show");
    });
    }
    
    function addproduct(){
    $("#addmodel").modal("show");
    
    }
    
    function handledel()
    {
        var btn=$(this);
        var parent=btn.closest(".product");
        let id=parent.attr("data-id");
        console.log(id);
    
        $.ajax({
    
            url:"https://jsonplaceholder.typicode.com/todos/"+id,
            method:"DELETE",
            success:function(){
                reqajex();
            },
    
        });
    
    
    
    }
    
    function reqajex()
    {
    $.ajax({
        url:"https://jsonplaceholder.typicode.com/todos",
        method:"GET",
        success:function(result){
          var req= $("#recipes");
          console.log(result);
    
         req.empty();
          for(var i=0;i<result.length;i++){
             var rec=result[i];
              req.append(`
              <div class="product" data-id="${rec.id}">
               <u><h4>Userid:</h4></u><p>${rec.userId}</p>
               <u><h4>tittle:</h4></u><p>${rec.title}<p>
              <u><h4>Completed:</h4></u><p><button class="btn btn-danger btn-sm float-right"> Delete</button> <button class="btn btn-warning btn-sm float-right"> Edit</button>
                ${rec.completed}</p>
              </div>`);
    
              
              
             
    
          }
        },
        
    
    });
    }




    function addtodo()
    {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then( (apidata) =>{
          return apidata.json();

        }).then((orignaldata)=>{

            console.log(orignaldata[0])
        })
    }