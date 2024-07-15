class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for( let i = 0; i < neuronCounts.length-1; i++){
            this.levels.push(new Level(
                neuronCounts[i],
                neuronCounts[i+1]
            ))
        }

    // console.log(this.levels);
    }

    static feedForward(givenInputs, netwrok){
        let outputs = Level.feedForward(givenInputs, netwrok.levels[0]);

        for (let i = 1; i < netwrok.levels.length; i++){
            outputs = Level.feedForward(outputs, netwrok.levels[i]);
        }

        return outputs;
    }

    static mutate(network, amount = 1){
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++){
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                )
            }

            for (let i = 0; i < level.weights.length; i++){
                for (let j = 0; j < level.weights[i].length; j++){
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
    }

}


class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];

        for(let i = 0; i < inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }
    
    // these static methods are associated to the class itself and not with any particular instance of the class
    // they can be called without creating an instance of the class
    static #randomize(level){
        for (let i = 0; i < level.inputs.length; i++){
            for (let j = 0; j < level.outputs.length; j++){
                level.weights[i][j] = Math.random() * 2 -1; // this generates random values between -1 and 1
            }
        }

        for (let i = 0; i < level.biases.length; i++){
            level.biases[i] = Math.random() * 2 -1; // this generates random values between -1 and 1
        }

        // Both weights and biases are positive and negative numbers
        // This is to assist with the decision making process
        // As the activiation function will check which nodes have a higher value
        // and negative values help with telling the network which nodes to ignore
        // and which ones to activate.
    }

    static feedForward(givenInputs, level){
        for (let i = 0; i < level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        // console.log(level.outputs.length);
        for (let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            // in this loop we are selection the output node we are calculating the value for.
            for (let j = 0; j< level.inputs.length; j++){
                // this is the sum of the product of the input value at j and the connection/edge connecting j to i
                sum += level.inputs[j] * level.weights[j][i]; 
            }

            if (sum > level.biases[i]){
                level.outputs[i] = 1;
            }else{
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }


}
