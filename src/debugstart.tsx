import { App, Route, Response, Param, JSON } from './utah';
import HelloWorldHandler from './handlers/helloworld';

<App>
    <Route path='/translation'>
        <JSON>
            {{
                'bed' : 'cama',
                'butterfly' : 'mariposa',
                'cow' : 'vaca'
            }}
        </JSON>
    </Route>
    <Route path='/candies'>
        <JSON>
           {
               ['lollipops', 'jollyranchers']
           }
        </JSON>
    </Route>
</App>