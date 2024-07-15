class Car{
    constructor(x, y, width, height, controlType, maxSpeed = 3, color = "blue"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;

        this.friction = 0.05;
        this.angle = 0

        this.damaged = false;

        this.useBrain = controlType == "AI";

        if (controlType !== "DUMMY"){
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.rayCount, 6, 4]
            );
        }
        this.controls = new Controls(controlType);

        this.image = new Image();
        this.image.src = "car.png";

        this.mask = document.createElement("canvas");
        this.mask.width = width;
        this.mask.height = height;

        const maskCtx = this.mask.getContext("2d");
        this.image.onload = () => {
            maskCtx.fillStyle = color;
            maskCtx.fillRect(0, 0, this.width, this.height);
            maskCtx.fill();

            // this will ensure that the color is only visible pixels of the car
            // when the blue rectangle overlaps with the car.
            maskCtx.globalCompositeOperation = "destination-atop";
            maskCtx.drawImage(this.image, 0, 0, this.width, this.height);

        }


    }

    update(roadBorders, traffic){
        // console.log(roadBorders)
        if (!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }
        if (this.sensor){
            this.sensor.update(roadBorders, traffic);
            const offsets = this.sensor.readings.map(
                s => s == null ? 0 : 1-s.offset
            );

            const outputs = NeuralNetwork.feedForward(offsets, this.brain)
            // console.log(outputs);

            if (this.useBrain){
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }
    }

    #assessDamage(roadBorders, traffic){
        for(let i = 0; i < roadBorders.length; i++){
            if (polysIntersect(this.polygon, roadBorders[i])){
                return true;
            }
        }
        for(let i = 0; i < traffic.length; i++){
            if (polysIntersect(this.polygon, traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points = [];
        const radius = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha)*radius,
            y: this.y - Math.cos(this.angle - alpha)*radius
        });

        points.push({
            x: this.x - Math.sin(this.angle + alpha)*radius,
            y: this.y - Math.cos(this.angle + alpha)*radius
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha)*radius,
            y: this.y - Math.cos(Math.PI + this.angle - alpha)*radius
        }); 

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha)*radius,
            y: this.y - Math.cos(Math.PI + this.angle + alpha)*radius
        });

        return points;
    }

    #move(){
        // this is to make the car move forward and backward
        // Using the proper physics equations(friction and acceleration)
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2){
            this.speed = -this.maxSpeed / 2;
        }
        if(this.speed > 0){
            this.speed-=this.friction;
        }
        if(this.speed < 0){
            this.speed+=this.friction;
        }
        // this is to ensure that the car stops and doesn't keep moving
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        // This is to make the car move left and right
        // we will be using trigonometric functions to understanc the degree of rotation
        if (this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left){
                this.angle += 0.03 * flip;
            }
            if (this.controls.right){
                this.angle -= 0.03 * flip;
            }
        }

        // This is to make the car move forward and backward

        this.y -= Math.cos(this.angle) * this.speed;
        this.x -= Math.sin(this.angle) * this.speed;
    }


    draw(ctx, drawSensor = false){
        if (this.sensor && drawSensor){
            this.sensor.draw(ctx);
        }

        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        if (!this.damaged){
        ctx.drawImage(this.mask,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.globalCompositeOperation = "multiply";
    }
        ctx.drawImage(this.image,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.restore();


    }
}