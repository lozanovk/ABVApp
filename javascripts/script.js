var drinkAry = [];

$(document).ready(function () {
    var counter = 1;


    $("#somebutton").click(function () {
        var cols = "";
        cols +='<div class="card col-lg-6 col-md-6 col-sm-6 col-xs-6" align="center"><div class="card-body" id="card' + counter +'" ><div class="winner" id="best' + counter + '" hidden><div>BEST VALUE !!!</div><br></div><h2 class="card-title" id="result' + counter + '"></h2><br><div>Drink Name</div><input type="text" class="form-control" id="name' + counter + '" name="name' + counter + '" onchange="calcADO('+ counter +')"/><br><div>% ABV</div><input type="number" class="form-control" id="abv' + counter + '" name="abv' + counter + '" onchange="calcADO('+ counter +')"/><br><div>Quantity</div><div class="input-group"><input type="number" class="form-control qtys" id="qty' + counter + '" name="qty' + counter + '" onchange="calcADO('+ counter +')"/><span>&nbsp;&nbsp;</span><select class="form-select sel" id="unit' + counter + '" name="unit' + counter + '" onchange="calcADO('+ counter +')"><option value="1" selected>oz</option><option value="2">mL</option><option value="3">dL</option><option value="4">Gal</option><option value="5">12 oz cans</option><option value="6">16 oz cans</option><option value="7">Pint</option></select></div><br><div>Cost ($)</div><input type="number" class="form-control" id="cost' + counter + '" name="cost' + counter + '" onchange="calcADO('+ counter +')"/><br><input type="button" class="ibtnDel btn btn-md btn-danger" id="del' + counter +'" value="Delete"><br></div></div>';
        $(".container").append(cols);
        counter++;
      });


    $(".container").on("click", ".ibtnDel", function (event) {
        var targetStr = $(this).attr("id");
        for (var i = drinkAry.length - 1; i >= 0; --i) {
            if (drinkAry[i].drinknum == targetStr.replace('del','')) {
              drinkAry.splice(i,1);           
            }
        }
        $(this).closest(".card").remove(); 
        
        $('.winner').attr('hidden',true);
        if (drinkAry.length > 1){
            calculateBest();
        }
       //drinkAry.splice(drinkAry.findIndex(item => item.drinknum == targetStr.replace('del','')), 1)      
        //counter -= 1
    });


});


function calcADO(drinkNum){
    var name = $('#name' + drinkNum).val();
    var abv =  $('#abv' + drinkNum).val();
    var qty =  $('#qty' + drinkNum).val();
    var unit = $('#unit' + drinkNum).val();
    var cost = $('#cost' + drinkNum).val();
    var divValOz = 1;
    var ado = 0;

    if ( abv && qty && unit && cost){
        //first convert units into OZ
        if(unit == 1){
            divValOz = qty/1;
        } else if(unit == 2){
                divValOz = qty/29.57;
        }else if(unit == 3){
                divValOz = qty/0.2957;    
        }else if(unit == 4){
                divValOz = qty/0.078; 
        }else if(unit == 5){
                divValOz = qty*12;
        }else if(unit == 6){  
            divValOz = qty*16;  
        }else if(unit == 7){  
            divValOz = qty*16;  
        }
        
        // now get ADO
        ado = (abv * divValOz)/cost;
        $('#result' + drinkNum).html(ado.toFixed(2));

        //populate date into array
        if (drinkAry.findIndex((obj => obj.drinknum == drinkNum))  == drinkNum){
            drinkAry[drinkNum].name = name;
            drinkAry[drinkNum].qty = qty;
            drinkAry[drinkNum].unit = unit;
            drinkAry[drinkNum].cost = cost;
            drinkAry[drinkNum].ado = ado;
        } else {
            drinkAry.push( {'drinknum' : drinkNum, 'name': name, 'qty' : qty, 'unit' : unit, 'cost' : cost, 'ado' : ado});
        }

    }else{
        $('#result' + drinkNum).html("??");
    }
    
    if (drinkAry.length > 1){
        calculateBest();
    }
}

function calculateBest(){
    var maxValue = Math.max(...drinkAry.map(o => o.ado), 0);
    var indxVal = drinkAry.findIndex(obj => obj.ado == maxValue);
    $('.winner').attr('hidden',true);
    $('#best' + indxVal).attr('hidden',false);
}
