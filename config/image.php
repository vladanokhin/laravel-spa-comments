<?php

return [

    /*
     * All uploaded user images will be resized to the size specified in the configuration
     */

    'width' => env('USER_IMAGE_WIDTH', 320),

    'height' => env('USER_IMAGE_HEIGHT', 240),

];
