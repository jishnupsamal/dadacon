import React from 'react'
import Spinner from './Spinner'
import { useState } from 'react';

function FaceRecog() {
    const URL = "https://teachablemachine.withgoogle.com/models/nA-FTeXc5/";
    
    const [loading,setLoading]=useState(false)

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    let model, webcam, labelContainer, maxPredictions;


    async function init() {
        const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    setLoading(true)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        setLoading(false);
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
}
// </script>
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen text-center '>
      <div className='text-4xl font-Spy pb-2 text-white '>Identify the Suspect</div>
<button type="button" className='border text-xl font-semibold bg-purple-500 rounded-md px-2 mb-3' onClick={init}>Start</button>
<div className='text-white' id="webcam-container"></div>
<div className='text-white ' id="label-container"></div>
{loading && <Spinner/>}
    {/* // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel

    // Load the image model and setup the webcam */}

    </div>
  )
}

export default FaceRecog
