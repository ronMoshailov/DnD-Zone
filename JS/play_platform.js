
class Platform extends Phaser.Scene {
    preload() {
        this.load.image('map', 'Images/Maps/Neverwinter.png');
        this.tokenClicked = false;
        this.tokenScale = 1;
        this.newMapKey = 'newMapTexture';
        this.newMapNum = 0;

    }

    create() {
        let lastClickedToken = null;
        let lastClickedTokenText = null;
        this.cam = this.cameras.main;

        this.canvasWidth = this.sys.game.config.width;
        this.canvasHeight = this.sys.game.config.height;

        // Add the map image to the center of the canvas
        this.map = this.add.image(this.canvasWidth / 2, this.canvasHeight / 2, 'map');

        // Set the display width and height of the map image to match the canvas size
        this.map.displayWidth = this.canvasWidth;
        this.map.displayHeight = this.canvasHeight;
        this.spritesScale = 0.2;
        
        const deleteTokenButton = document.getElementById('deleteToken');
        const hideNameButton = document.getElementById('hideTokenName');
        const renameTokenButton = document.getElementById('renameToken');
        const sizeUpButton = document.getElementById('sizeUp');
        const sizeDownButton = document.getElementById('sizeDown');
        const mapName = document.getElementById('mapName');

         // Input field for map upload
        const mapInput = document.getElementById('mapUpload');
        const tokenInput = document.getElementById('tokenUpload');

        tokenInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                let tokenName = prompt("Please enter your Token name:");
                let newTokenName = tokenName;
                if (tokenName !== null && tokenName.trim() !== "") {
                    while (this.textures.exists(tokenName)) {                       
                        tokenName = tokenName + this.newMapNum++;
                    }
                    this.load.image(tokenName, e.target.result);
                    this.load.once('complete', () => {
                        const newToken = this.add.sprite(this.canvasWidth / 2, this.canvasHeight / 2, tokenName);
                        newToken.setScale(this.spritesScale); 
                        newToken.setInteractive({ draggable: true });

                        const tokenNameText = this.add.text(newToken.x, newToken.y + newToken.height *this.spritesScale / 2 , newTokenName, { font: '20px Fantasy', fill: '#ff0000',stroke:                                                                                                                                                '#000000',strokeThickness: 3 });
                        tokenNameText.setOrigin(0.5, 0);

                        newToken.on('dragstart', (pointer, dragX, dragY) => {
                            newToken.setTint(0xff0000);
                            this.tokenDrag = true; 
                        });

                        newToken.on('drag', (pointer, dragX, dragY) => {
                            newToken.x = dragX;
                            newToken.y = dragY;
                            tokenNameText.setPosition(newToken.x, newToken.y + newToken.height *  newToken.scaleY / 2 );

                        });
                        newToken.on('dragend', (pointer, dragX, dragY) => {
                            newToken.clearTint();
                            this.tokenDrag = false;                
                        });

                        newToken.on("pointerover", (p) => {
                            this.overToken = true;
                            newToken.setTint(0xff0000);
                
                        });
                
                        newToken.on("pointerout", (p) => {
                            this.overToken = false;
                            newToken.clearTint();
                        });
                        newToken.on('pointerdown', (pointer, localX, localY, event) => {
                            hideNameButton.removeAttribute('disabled');
                            deleteTokenButton.removeAttribute('disabled');
                            renameTokenButton.removeAttribute('disabled');
                            sizeUpButton.removeAttribute('disabled');
                            sizeDownButton.removeAttribute('disabled');
                            lastClickedToken = newToken;
                            lastClickedTokenText = tokenNameText;
                            deleteTokenButton.textContent = `Delete ${lastClickedTokenText.text}`;
                            
                        });

                        

                    });
                    this.load.start();
                } else {
                    console.log("User canceled or did not enter a valid Token name.");
                }
            };
            event.target.value = ''; // This clears the file input value

            // Read the uploaded file as data URL
            reader.readAsDataURL(file);
        });
        
        hideNameButton.addEventListener('click', () => {
            if (lastClickedTokenText) {
                if (lastClickedTokenText.visible) {
                    lastClickedTokenText.setVisible(false); // Hide the text
                    hideNameButton.textContent = "Show Name";
                } else {
                    lastClickedTokenText.setVisible(true); // Show the text
                    hideNameButton.textContent = "Hide Name";

                }
            }
        });

        
        deleteTokenButton.addEventListener('click', () => {
            if (lastClickedToken) {
                lastClickedToken.destroy();
                lastClickedTokenText.destroy();
                lastClickedToken = null;
                hideNameButton.setAttribute('disabled', 'disabled');
                renameTokenButton.setAttribute('disabled', 'disabled');
                deleteTokenButton.setAttribute('disabled', 'disabled');
                sizeUpButton.setAttribute('disabled', 'disabled');
                sizeDownButton.setAttribute('disabled', 'disabled');
                deleteTokenButton.textContent = 'Delete Token'
            }
        });

        renameTokenButton.addEventListener('click', () => {
            if (lastClickedToken) {
                let newName = prompt("Choose new name for token:");
                if (newName !== null && newName.trim() !== "") {
                    lastClickedTokenText.setText(newName);
                    lastClickedTokenText.setPosition(lastClickedToken.x, lastClickedToken.y + lastClickedToken.height * lastClickedToken.scale / 2 );
                    deleteTokenButton.textContent = `Delete ${lastClickedTokenText.text}`;

                }
            }
        });


        sizeUpButton.addEventListener('click', () => {
            if (lastClickedToken) {
                lastClickedToken.setScale(lastClickedToken.scale + 0.05); // Adjust the scaling factor as needed
                // Scale the text by adjusting the font size
                const currentFontSize = lastClickedTokenText.style.fontSize.replace('px', '');
                const newFontSize = parseInt(currentFontSize) + 5; // Adjust the increment as needed
                lastClickedTokenText.setFontSize(newFontSize);
                lastClickedTokenText.setPosition(lastClickedToken.x, lastClickedToken.y + lastClickedToken.height * lastClickedToken.scale / 2 );
            }
        });

        sizeDownButton.addEventListener('click', () => {
            if (lastClickedToken) {
                lastClickedToken.setScale(lastClickedToken.scale - 0.05); // Adjust the scaling factor as needed
                const currentFontSize = lastClickedTokenText.style.fontSize.replace('px', '');
                const newFontSize = parseInt(currentFontSize) - 5; // Adjust the decrement as needed
                lastClickedTokenText.setFontSize(newFontSize);
                lastClickedTokenText.setPosition(lastClickedToken.x, lastClickedToken.y + lastClickedToken.height * lastClickedToken.scale / 2 );
            }
        });
        mapInput.addEventListener('change', (event) => {
            const file = event.target.files[0];        
            const reader = new FileReader();
            reader.onload = (e) => {                
                while (this.textures.exists(this.newMapKey)){
                    this.newMapKey = this.newMapKey + this.newMapNum++;
                }
                this.load.image(this.newMapKey, e.target.result);
                // Once the new image is loaded, update the texture of the map image
                this.load.once('complete', () => {
                    this.map.setTexture(this.newMapKey);
                    this.map.displayWidth = this.canvasWidth;
                    this.map.displayHeight = this.canvasHeight;
                });
                this.load.start();
                mapName.textContent  = file.name;
            };
            reader.readAsDataURL(file);
        });
        
        this.cam.setZoom(1);

        this.input.on("pointermove", (p) => {
            if (!p.isDown) return;
            
            if(!this.tokenDrag){
                this.cam.scrollX -= (p.x - p.prevPosition.x) / this.cam.zoom;
                this.cam.scrollY -= (p.y - p.prevPosition.y) / this.cam.zoom;
            }
            
        });

        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            const zoomSpeed = 0.002; // Adjust the zoom speed as needed
            const zoomAmount = deltaY * zoomSpeed;
        
            // Clamp the zoom level to a desired range if needed
            const minZoom = 1;
            const maxZoom = 7;
        
            // Adjust the camera zoom level
            this.cam.zoom = Phaser.Math.Clamp(this.cam.zoom - zoomAmount, minZoom, maxZoom);
        });
        this.input.on('pointerdown', (pointer, localX, localY, event) => {
            // Check if the click event is not on a token
            if (!this.overToken) {
                hideNameButton.setAttribute('disabled', 'disabled');
                renameTokenButton.setAttribute('disabled', 'disabled');
                deleteTokenButton.setAttribute('disabled', 'disabled');
                sizeUpButton.setAttribute('disabled', 'disabled');
                sizeDownButton.setAttribute('disabled', 'disabled');
                deleteTokenButton.textContent = 'Delete Token'
                
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Platform
};

const game = new Phaser.Game(config);
