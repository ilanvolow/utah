import { App, Route, Response, Param, JSON } from './utah';
import HelloWorldHandler from './handlers/helloworld';

<App>
  <Route path='/hello' method='get' handler={ HelloWorldHandler }>
     <Param name='person' datatype='string' paramtype='query'>
          The name of the person
     </Param>
    <Response code='400' name='bunnySuccessReponse'/>
    <Response code='200' name='successfulThreadResponse'/>
  </Route>
</App>;