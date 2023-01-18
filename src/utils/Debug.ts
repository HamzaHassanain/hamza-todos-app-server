import { Colors } from "./consts";
class Debug {
    public enabled: boolean = true;
    
    error(...messages:any[]) {
        if(!this.enabled) return;
        console.error(Colors.FgRed ,...messages , Colors.Reset);
    }
    log(...messages:any[]) {
        if(!this.enabled) return;
        console.error(...messages);
    }
    info(...messages:any[]) {
        if(!this.enabled) return;
        console.error(Colors.FgBlue ,...messages , Colors.Reset);
    }

    success(...messages:any[]) {
        if(!this.enabled) return;
        console.error(Colors.FgGreen ,...messages , Colors.Reset);
    }
}

export default new Debug();