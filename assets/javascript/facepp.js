let faceConfig = {
    face_token: "ri01AlUOp4DUzMzMYCjERVeRw88hlvCa",
    face_secret: "pF3JOAxBENEYXV-Q96A3s-CkyWqBg49u"
}
let faceAttributes = {};

function detectImg() {
    $('#emotion').text("");
    document.getElementsByClassName('loadingText')[0].classList.remove("hidden")
    var r = new FileReader();
    f = document.getElementById('testImg').files[0];
    r.readAsDataURL(f);
    r.onload = function (e) {
        document.getElementById('inputImg').src = this.result;
        document.getElementById('emotion').textContent= "";
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
            analyzeImg(); //call the image analyzer function
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
        if (value > bestScore) {
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


/////////////////////////////////////
// use the camera
// grab html elements
const video = document.querySelector('video');
const startCamButton = document.querySelector('#btn-startCam');
const takeSnapButton = document.querySelector('#btn-takeSnap');
const hiddenCanvas = document.querySelector('canvas');
const snapshotImg = document.querySelector('#inputImg');

// device feature detection
function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// TODO: check if access is already granted

// use only video
const constraints = {
    video: true
};

// start streaming camera
startCamButton.onclick = function () {
    event.preventDefault();
    if (hasGetUserMedia()) {
        // Good to go!
        console.log("Great, getUserMedia() is supported");
        $('#emotion').empty() 
    } else {
        console.error('Error: getUserMedia() is not supported by your browser');
    }
    
    // get video stream and deal with it
    navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);

    // function to handle video stream
    function handleSuccess(stream) {
        takeSnapButton.disabled = false;
        video.srcObject = stream;
        video.style.display = 'block';
        // disable start camera button
        startCamButton.disabled = true;
        // make sure the snapshot img tag is hidden;
        snapshotImg.style.display = "none";
    }
    // handle errors
    function handleError(error) {
        console.error('Error: cannot start video stream. getUserMedia() failed ', error);
    }
}

takeSnapButton.onclick = video.onclick = function () {
    event.preventDefault();
    // Setup a canvas with the same dimensions as the video.
    hiddenCanvas.width = video.videoWidth;
    hiddenCanvas.height = video.videoHeight;
    // Make a copy of the current frame in the video on the canvas.
    hiddenCanvas.getContext('2d').drawImage(video, 0, 0);
    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    // Other browsers will fall back to image/png
    snapshotImg.src = hiddenCanvas.toDataURL('image/png');
    // Pause video playback of stream.
    video.pause();
    // disable snapshot button
    takeSnapButton.disabled = true;
    // hide video tag, since the video has been paused.
    video.style.display = 'none';
    // show image
    snapshotImg.style.display = "block";
    // enable start camera button
    startCamButton.disabled = false;


    document.getElementsByClassName('loadingText')[0].classList.remove("hidden")
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
    let data = new FormData();
    data.append('api_key', "ri01AlUOp4DUzMzMYCjERVeRw88hlvCa");
    data.append('api_secret', "pF3JOAxBENEYXV-Q96A3s-CkyWqBg49u");
    data.append('image_base64', snapshotImg.src);
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success(data) {
            faceConfig.face_token = data.faces[0].face_token;
            analyzeImg(); //call the image analyzer function
        }
    })
}



