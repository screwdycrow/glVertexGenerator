/**
 * Created by Dimitris on 6/27/2017.
 */
function readURL(input) {

    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }

}



$(document).ready(function() {
    let tool = 'vertex';
    let zindex = 1;
    let code = '';
    let code2 = '';
    let codergb = '';
    $('#blah').click(function(e) {
        let offset = $(this).offset();
        let x = e.pageX - offset.left;
        let y = e.pageY - offset.top;
        if(tool ==='vertex'){

            if ($('#invertheight').is(":checked"))
            {
                // it is checked
                let offsety =  Number($("#offsety").val());
                let offsetx =  Number($("#offsetx").val());
                let height = this.height;
                y = y - offsety;
                y =  height - y.toFixed(1) + ($('#varxy').is(":checked")? ' + '+$('#vary').val():'');
                x = x + offsetx;
                x = x.toFixed(1) + ($('#varxy').is(":checked")? ' + '+$('#varx').val():'');
            }else{
                let offsety =  Number($("#offsety").val());
                let offsetx =  Number($("#offsetx").val());
                y = y + offsety;
                y = y.toFixed(1) + ($('#varxy').is(":checked")? ' + '+$('#vary').val():'');
                x = x + offsetx;
                x = x.toFixed(1) + ($('#varxy').is(":checked")? ' + '+$('#varx').val():'');
            }
            code+=`<br> glVertex2f(${x}, ${ y });`;
            code2+=`<br> glVertex3f(${x}, ${y}, ${zindex});`;
            $("#xybefore").html(`${x}, ${ y }`);
            $("#code").html(code);
            $("#code3f").html(code2);

        }else if(tool==='colorpicker'){
            if(!this.canvas) {
                this.canvas = $('<canvas />')[0];
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
            }

            let pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
            codergb = `	glColor3f(${(pixelData[0]/255).toFixed(2)},${(pixelData[1]/255).toFixed(2)},${(pixelData[2]/255).toFixed(2)});`;
            $("#codergb").html(codergb);
            console.log(pixelData);

        }

    });

    $("#imgInp").change(function(){
        readURL(this);
    });

    $("#clear").click(function (e) {
        e.preventDefault();
        code='';
        code2 = '';
        $("#code").html('');
        $("#code3f").html('');

    });
    $("#setzindex").click(function (e) {
        e.preventDefault();
        zindex = $("#zindex").val();

    });
    $("#settool").click(function (e) {
        e.preventDefault();
        tool = $("#settool").val();
    })
    $("#clearrgb").click(function (e) {
        codergb = '';
        $("#codergb").html('');


    })

});