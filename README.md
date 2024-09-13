# Self Driving Car Simulation
This is a Self-Driving Car Simulation created using only JavaScript, HTML, and CSS. The project demonstrates how a neural network can be used to control a car driving on a road while avoiding obstacles (other cars). The neural network visualizes decision-making processes, including lane changing and maintaining a safe distance from other vehicles, all without external libraries or frameworks.

## Features
- **Neural Network Simulation**: A simple neural network used to simulate how a car makes decisions in real time, based on its surroundings.
- **Car Sensors**: The car is equipped with simulated sensors (represented by lines) that detect nearby obstacles and vehicles, helping it navigate.
- **Keyboard Controls**: The car can be controlled manually using the `W`, `A`, `S`, `D` keys, allowing for comparison between manual and autonomous driving.
- **Real-Time Neural Network Visualization**: The decision-making process is visualized in real time. Each neuron in the neural network is shown interacting with the input (sensor data) and output (steering and throttle decisions).
- **Genetic Algorithm with Mutation**: A genetic algorithm is used to optimize the neural network, allowing for mutation and evolution of car behavior over time for better decision-making.
- **Road Obstacles**: Multiple cars (obstacles) are placed on the road for the autonomous car to avoid. These cars are randomly positioned.
- **Save and Discard Network**: The current neural network state can be saved or discarded, allowing for testing different configurations.

## Project Structure
- **HTML**: The base layout and structure of the page, including the road. cars. and buttons(`Save` and `Discard`)
- **CSS**: Stying for the road, cars, and the neural network visualization to give the project a simple but effective look.
- **JavaScript**: Handles the login for:
  - Car movement and sensor detection
  - Neural network decision-making and visualization
  - Manual control of the car using keyboard inputs.
 
## How to Run
1. Clone the repository to your local machine:
```
git clone <repository-link>

``` 

2. Navigate to the project directory and open the `index.html` file in the web browser:
```
cd self-driving-car
open index.html

```
3. The simulation will start, and you can observe the car making decisions based on the neural network. 
## Future Improvements
- Implementing advanced machine learning algorithms to improve the car's decision-making.
- Adding more complex obstacles and multi-lane driving.
- Enhancing the neural network for better training and learning capabilities.

![image](https://github.com/user-attachments/assets/53b2c695-379a-48e0-9c90-5bc01a669171)
