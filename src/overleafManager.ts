import { OverleafHistoryManager } from "./overleafHistory";
import { OverleafPath } from "./overleafPath";
import { OverleafPathListener } from "./overleafPathListener";

export class OverleafManager {

    pathListener = new OverleafPathListener();
    historyManager = new OverleafHistoryManager(OverleafPath.getCurrentPath());

    constructor() {
        this.pathListener.addOnPathChange(path => {
            if(!(path.equals(this.historyManager.getLocation()))) {
                // this.historyManager.setLocation(path);
                let strPath = path.getPathString();
                window.history.pushState(path, `${document.title} - ${strPath}`, `${location.pathname}#${strPath}`)
            }
        });
        this.pathListener.startListening();
    }

    // (function(window, location) {
    //     history.replaceState(null, document.title, location.pathname+"#!/stealingyourhistory");
    //     history.pushState(null, document.title, location.pathname);
    
    //     window.addEventListener("popstate", function() {
    //       if(location.hash === "#!/stealingyourhistory") {
    //             history.replaceState(null, document.title, location.pathname);
    //             setTimeout(function(){
    //               location.replace("http://www.programadoresweb.net/");
    //             },0);
    //       }
    //     }, false);
    // }(window, location));




    // private getCurrentFileNavigationElement():HTMLElement {
    //     return document.querySelector("li.selected[role=treeitem]");
    // }

    // private getFileNavigationElementParent(elm:HTMLElement):HTMLElement {
    //     if(elm.parentElement.classList.contains("file-tree-list")) // Top element
    //         return null;
        
    //     //@ts-ignore
    //     return elm.parentElement.previousSibling;
    // }

}

