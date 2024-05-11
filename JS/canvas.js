function UploadPlay() {
    // Canvas and context initialization
    let canvas = document.getElementById("PlayCanvas");
    let ctx = canvas.getContext('2d');

    // Variables initialization
    let zCounter = 0;
    let isMapDragging = false;
    let isTokenDragging = false;
    let selectedToken = null;
    let dragStart = { x: 0, y: 0 };
    let cameraOffset = { x: 0, y: 0 };
    let cameraZoom = 1;
    let MAX_ZOOM = 7;
    let MIN_ZOOM = 1;
    let SCROLL_SENSITIVITY = 0.005;
    let offsetX = 0;
    let offsetY = 0;
    let scale = 0;
    let canvasMid = { x: canvas.width / 2, y: canvas.height / 2 };
    let MapImg = new Image();
    MapImg.onload = function () {
        draw();
    };
    let TokenImgs = [];

    // Function to handle map upload
    function handleMapUpload(e) {
        let reader = new FileReader();
        reader.onload = function (event) {
            MapImg.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    // Function to handle character image upload
    function handleCharacterImgUpload(e) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let newTokenImg = new Image();
            newTokenImg.onload = function () {
                TokenImgs.push({ image: newTokenImg, zIndex: zCounter++, x: canvasMid.x , y: canvasMid.y });
            };
            newTokenImg.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    // Function to handle mouse pointer up event
    function onPointerUp(e) {
        isMapDragging = false;
        isTokenDragging = false;
        selectedToken = null;
    }

    // Function to adjust zoom
    function adjustZoom(zoomAmount, zoomFactor) {
        if (!isMapDragging) {
            if (zoomAmount) {
                cameraZoom -= zoomAmount;
            } else if (zoomFactor) {
                cameraZoom = zoomFactor * cameraZoom;
            }
            cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
            cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
        }
    }

    // Function to handle mouse pointer move event
    function onPointerMove(e) {
        const canvasMousePosition = getRelativeMousePosition(canvas, e);
        if (isTokenDragging && selectedToken) {
            selectedToken.x = (canvasMousePosition.x - cameraOffset.x) / cameraZoom - dragStart.x;
            selectedToken.y = (canvasMousePosition.y - cameraOffset.y) / cameraZoom - dragStart.y;
        } else if (isMapDragging) {
            cameraOffset.x += canvasMousePosition.x - dragStart.x;
            cameraOffset.y += canvasMousePosition.y - dragStart.y;
            dragStart.x = canvasMousePosition.x;
            dragStart.y = canvasMousePosition.y;
        }
        draw();
    }

    // Function to draw on the canvas
    function draw() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasMid = { x: canvas.width / 2, y: canvas.height / 2 };
        scale = Math.min(window.innerWidth / MapImg.width, window.innerHeight / MapImg.height);
        let offsetX = (window.innerWidth - MapImg.width * scale) / 2;
        let offsetY = (window.innerHeight - MapImg.height * scale) / 2;
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
        ctx.scale(cameraZoom, cameraZoom);
        ctx.translate(-window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(MapImg, offsetX, offsetY, MapImg.width * scale, MapImg.height * scale);
        TokenImgs.forEach(currentToken => {
            ctx.drawImage(currentToken.image, currentToken.x , currentToken.y, currentToken.image.width * scale, currentToken.image.height * scale);
        });
        requestAnimationFrame(draw);
    }

    // Function to handle mouse pointer down event
    function onPointerDown(e) {
        const canvasMousePosition = getRelativeMousePosition(canvas, e);
        const adjustedMouseX = (canvasMousePosition.x - cameraOffset.x) / cameraZoom;
        const adjustedMouseY = (canvasMousePosition.y - cameraOffset.y) / cameraZoom;
        isMapDragging = false;
        isTokenDragging = false;
        selectedToken = null;
        for (let token of TokenImgs) {
            if (adjustedMouseX >= token.x && adjustedMouseX <= token.x + token.image.width * scale &&
                adjustedMouseY >= token.y && adjustedMouseY <= token.y + token.image.height * scale) {
                isTokenDragging = true;
                selectedToken = token;
                dragStart.x = adjustedMouseX - token.x;
                dragStart.y = adjustedMouseY - token.y;
                return;
            }
        }
        if (!isTokenDragging) {
            isMapDragging = true;
            dragStart.x = canvasMousePosition.x;
            dragStart.y = canvasMousePosition.y;
        }
    }

    // Function to get event location
    function getEventLocation(e) {
        if (e.touches && e.touches.length == 1) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.clientX && e.clientY) {
            return { x: e.clientX, y: e.clientY };
        }
    }

    // Function to get relative mouse position
    function getRelativeMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
    }

    // Event listeners for mouse and touch events
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('touchstart', onPointerDown);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchend', onPointerUp);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('touchmove', onPointerMove);
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        adjustZoom(e.deltaY * SCROLL_SENSITIVITY);
    });

    // Event listeners for file upload
    document.getElementById('MapUpload').addEventListener('change', handleMapUpload);
    document.getElementById('CharacterImgUpload').addEventListener('change', handleCharacterImgUpload);

    // Initial draw
    draw();
}
