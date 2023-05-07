import React from 'react';
import Tournament from './Tournament';

const server1 = ['http://localhost:8000/api/results/1' , 'http://localhost:8000/api/results/2'];
const server2 = ['http://localhost:8000/api/results/1' , 'http://localhost:8000/api/results/2'];

const Results: React.FC = () => {

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
                    <h3 className="mb-4 input-group w-100 p-1 tournament_container">Server 1</h3>
                    {server2.map((feedUrl, index) => (
                          <Tournament key={index} feedUrl={feedUrl}  />
                    ))}
                </div>

               </div>
    </>
  );
};

export default Results;