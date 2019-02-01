let faceConfig = {
    face_token: "ri01AlUOp4DUzMzMYCjERVeRw88hlvCa",
    face_secret: "pF3JOAxBENEYXV-Q96A3s-CkyWqBg49u"
}
let faceAttributes = {};

function detectImg() {
    document.getElementsByClassName('loadingText')[0].classList.remove("hidden")
    var r = new FileReader();
    f = document.getElementById('testImg').files[0];
    r.readAsDataURL(f);
    r.onload = function (e) {
        document.getElementById('inputImg').src = this.result;
    }
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
    let files = $('#testImg').prop('files');
    let data = new FormData();
    data.append('api_key', "ri01AlUOp4DUzMzMYCjERVeRw88hlvCa");
    data.append('api_secret', "pF3JOAxBENEYXV-Q96A3s-CkyWqBg49u");
    data.append('image_file', files[0]);
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success(data) {
            faceConfig.face_token = data.faces[0].face_token;
            analyzeImg(); //call teh image analyzer function
        }
    })
}

function getBestEmotion(emotionDict) {
    var bestEmotion = "neutral"; // default emotion: neutral
    var bestScore = 0;
    var candidateEmotion = ["neutral", "happiness", "sadness", "surprise", "fear"];
    for (key in emotionDict) {
        value = parseInt(emotionDict[key]);
        console.log(key, value);
        if (value > bestScore & candidateEmotion.indexOf(key) >= 0 ) {
            bestEmotion = key;
            bestScore = value;
            console.log("higher");
        }
    }
    return bestEmotion;
}

function analyzeImg() {
    // document.getElementsByClassName('loadingText')[0].classList.add("hidden")
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/face/analyze';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            api_key: "ri01AlUOp4DUzMzMYCjERVeRw88hlvCa",
            api_secret: "pF3JOAxBENEYXV-Q96A3s-CkyWqBg49u",
            face_tokens: faceConfig.face_token,
            return_attributes: "gender,age,emotion"
        },
        success(data) {
            document.getElementsByClassName('loadingText')[0].classList.add("hidden")
            console.log(data);
            emotion = data.faces[0].attributes.emotion; // use only the first face, for now
            bestEmotion = getBestEmotion(emotion);
            let attributes = data.faces[0].attributes;
            faceAttributes = {
                age: attributes.age.value,
                gender: attributes.gender.value,
                bestEmotion: bestEmotion
            }
            console.log(faceAttributes);
            $('#gender').text(faceAttributes.gender);
            $('#age').text(faceAttributes.age);
            $('#emotion').text(faceAttributes.bestEmotion);


            
        }

        
    })

    
}



