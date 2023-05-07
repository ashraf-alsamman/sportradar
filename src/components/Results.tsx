import React from 'react';
import Tournament from './Tournament';

const Results: React.FC = () => {
  function getTwoDifferentRandomNumbers() {
    const firstNumber = Math.floor(Math.random() * 3) + 1;
    let secondNumber;
  
    do {
      secondNumber = Math.floor(Math.random() * 3) + 1;
    } while (secondNumber === firstNumber);
  
    return [firstNumber, secondNumber];
  }
  
  const [randomNumber1, randomNumber2] = getTwoDifferentRandomNumbers();
  const server1 = ['http://localhost:8082/api/results/'+randomNumber1];
  const server2 = ['http://localhost:8083/api/results/'+randomNumber2];
 


  return (
    <>
               <div className='row'>

                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                    <h3 className="mb-4 input-group w-100 p-1 tournament_container">Server 1</h3>
                    {server1.map((feedUrl, index) => (
                          <Tournament key={index} feedUrl={feedUrl}  />
                    ))}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                    <h3 className="mb-4 input-group w-100 p-1 tournament_container">Server 2</h3>
                    {server2.map((feedUrl, index) => (
                          <Tournament key={index} feedUrl={feedUrl}  />
                    ))}
                </div>

               </div>
    </>
  );
};

export default Results;