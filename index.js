'use strict'


//comment


class TheSite {
    
    modules = [] ;
    
    
    constructor () {
        
        const mainContent_landing = document.querySelector('#main-content-landing') ;

        const mainContent_goods = document.querySelector('#main-content-goods') ;

        const containerToBrandnames = document.querySelector('#aside-left');

        const menuLoader = () => {

            import('./javascript/store.js?v=' + Date.now()).then(module => {
                
                this.modules[Symbol.for('MenuButton')] = new module.MenuButton({
                    containerToSubjectDE: document.querySelector('.container_1') , 
                    targetToMenu: document.querySelector('.main-menu-common-container') , 
                });
            })

        }


        if(mainContent_landing) {

            import('./javascript/store.js?v=' + Date.now()).then(module => {
                
                
                this.modules[Symbol.for('GoodCard')] = new module.GoodCardsManager(mainContent_landing) ;
                
    
                menuLoader();
                
                console.log(this.modules);
            });
        }

        if(mainContent_goods) {
            
            import('./javascript/catalogManager.js?v=' + Date.now()).then(module => {


                this.modules[Symbol.for('CatalogManager')] = new module.CatalogManager(containerToBrandnames) ;

                console.log();
                menuLoader(); 
                
            });
        }

    }
}



'hello world' ;
'hello else' ;

new TheSite ;

let localstorage = window.localStorage ; 

document.querySelector('body').onclick = (e) => {
    e.stopPropagation();

    localStorage.setItem('myCat' , 'Tom ' + Date.now());
    console.log(localstorage);
    // localstorage.clear();

    // alert();
};