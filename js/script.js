$('#sub-breed').attr('disabled', true);
var breed, sub_breed = {}, image_arr;

$.ajax({
    url: 'https://dog.ceo/api/breeds/list/all',
    mehthod: 'GET',
    success: (data)=>{
      breed = Object.getOwnPropertyNames(data.message);
      for(let i=0; i<=breed.length - 1; i++){
        sub_breed[i] = data.message[breed[i]];
    }
    },
    async: false
})

function capitalize(string){
    for(let i=0; i<string.length; i++){
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }
    return string;
}

function setSubBreed(index){
    index = parseInt(index.substring(3));
    if(sub_breed[index].length == 0){
        $('#sub-breed option').remove();
        $('#sub-breed').attr('disabled', true);
    }
    else{
        $('#sub-breed option').remove();
        $('#sub-breed').attr('disabled', false);
        for(let i=0; i<sub_breed[index].length; i++){
            $('<option>',{
                value: sub_breed[index][i],
                id: 'sb'+i
            }).appendTo('#sub-breed');
            $('#sb'+i).html(sub_breed[index][i]);
        }
    }
}

function reverseCapitalize(a){
    if(a == null){return '';}
    return a.charAt(0).toLowerCase() + a.slice(1) + '/';
}

function displayImage(image_arr){
    let quo= (image_arr.length/50),quotient = parseInt(image_arr.length/50), rem = image_arr.length % 50, i=0;
    $('.image-container img').remove();
    if(quotient != 0){
        if(quotient == 1){
                for(let j=0; j<50; j++){
                    $('<img>',{
                        src: image_arr[j],
                        height: '100px',
                        width: '20%'
                    }).appendTo('.image-container');
            }
        }
        else if(quotient > 1){
            $('.buttons').css('display', 'flex');
            (function serial(i){
                if(i==quotient){
                    forRem();
                }
                if(i<quotient){
                    if(i==0){
                        $('#previous').css('display', 'none');
                        $('#next').css('display', 'inline-block');
                    }
                    else if(i == quotient-1 && quotient==quo){
                        $('#previous').css('display', 'inline-block');
                        $('#next').css('display', 'none');
                    }
                    else{
                        $('#previous').css('display', 'inline-block');
                        $('#next').css('display', 'inline-block');
                    }
                    for(let j=i*50; j<(i+1)*50; j++){
                        $('<img>',{
                            src: image_arr[j],
                            height: '200px',
                            width: '20%'
                        }).appendTo('.image-container');
                }
                $('#previous').click(()=>{
                    $('.image-container img').remove();
                    --i;
                    serial(i);
                });
                $('#next').click(()=>{
                    $('.image-container img').remove();
                    ++i;
                    serial(i)
                });
            }
            })(0);
        }
    }
    else{
        forRem();
    }
    function forRem(){
        $('#next').css('display', 'none');
        for(let i=0; i<rem; i++){
            $('<img>',{
                src: image_arr[i],
                height: '200px',
                width: '20%'
            }).appendTo('.image-container');
        }
    }
}

breed = capitalize(breed);

for(let i=0; i<Object.keys(sub_breed).length; i++){
    if(sub_breed[i].length != 0){
        sub_breed[i] = capitalize(sub_breed[i]);
    }
}

for(let i=0; i<breed.length; i++){
    $('<option>',{
        value: breed[i],
        id: 'val'+i
    }).appendTo('#breed');
    $('#val'+i).html(breed[i]);
}


$('#breed').change(()=>{
    setSubBreed($('#breed option:selected').attr('id')); 
});

$('#get-image').click(()=>{
    let b = reverseCapitalize($('#breed').val()), sb = reverseCapitalize($('#sub-breed').val());
    $.ajax({
        url: 'https://dog.ceo/api/breed/'+b+sb+ 'images',
        mehthod: 'GET',
        success: (data)=>{
            image_arr = data.message;
            displayImage(image_arr);
        }
    })
})
