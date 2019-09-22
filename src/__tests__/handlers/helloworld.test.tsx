// import request from 'supertest';
// import express from 'express';
// import App from '../../components/app';
// import Route from '../../components/route';
// import Response from '../../components/response';
// import Param from '../../components/param';

// import ResponseHandler from '../handlers/ResponseHandler';
// import HelloWorldHandler from '../../handlers/helloworld';


// describe('HelloWorld handler tests', () => {
//     it('Returns the correct response on success', async () => {

//       let appObject =
//       <App>
//         <Route path='/hello' method='get' handler={ HelloWorldHandler }>
//            <Param name='person' datatype='string' paramtype='query'>
//                 The name of the person
//            </Param>
//           <Response code='400' name='bunnySuccessReponse'/>
//           <Response code='200' name='successfulThreadResponse'/>
//         </Route>
//       </App>;

//       const response = await request(appObject.app).get('/bunny');
//       expect(response.statusCode).toBe(200);
//     });
//   });
