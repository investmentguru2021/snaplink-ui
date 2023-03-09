import * as React from 'react';
import TabbedPanel from "./TabbedPanel";
import "./application.css";
import AppMenu from './AppMenu';

export default function ApplicationHomeComponent (props){

    

    return (
        <div>
            
            <AppMenu sendData={props.sendData}/>
            <TabbedPanel data = {props.data}/>
        </div>
    );
}
