class GoodCard {

    subj_DOM_elem = document.createElement('div');

    img_container = document.createElement('div');
    img = document.createElement('img') ;
    img_src = '' ;

    data_container = document.createElement('div');

    description = '' ;
    description_container = document.createElement('div');

    price = undefined ;
    price_container = document.createElement('div');

    constructor ({imgSrc: imgSrc = '' , description: description = '' , price: price = undefined}) {

        console.log(imgSrc);

        this.subj_DOM_elem.className = 'good-card' ;
        this.data_container.className = 'cantainer-to-data' ;
        this.img_container.className = 'container-to-img' ;
        this.img.className = 'good-image' ;
        this.price_container.className = 'good-price' ;

        this.description_container.className = 'container-to-img-description' ;

        if(imgSrc) {
            
            this.img_src = imgSrc ;

            this.img.src = this.img_src ;

            this.img_container.append(this.img);
            this.subj_DOM_elem.append(this.img_container);
        }

        if(description) {

            this.description = description ;
            this.description_container.innerText = this.description ;
            this.data_container.append(this.description_container);
        }

        if(price) {

            this.price = price ;
            this.price_container.innerText = this.price ;
            this.data_container.append(this.price_container);
        }

        this.subj_DOM_elem.append(this.data_container);

        this.subj_DOM_elem.onclick = (e) => {

            console.log(e.currentTarget.classList.contains);

            if(e.currentTarget.classList.contains('forward')) {

                e.currentTarget.classList.toggle('appeared');
            }

            if(e.currentTarget.classList.contains('left')) {

                const forward = document.querySelector('.good-card.forward');
                const right = document.querySelector('.good-card.right');

                e.currentTarget.classList.toggle('forward');
                e.currentTarget.classList.toggle('left');
                forward.classList.toggle('right');
                forward.classList.toggle('forward');
                forward.classList.remove('appeared');
                right.classList.toggle('right');
                right.classList.toggle('left');
            }

            if(e.currentTarget.classList.contains('right')) {
                
                const forward = document.querySelector('.good-card.forward');
                const left = document.querySelector('.good-card.left');

                e.currentTarget.classList.toggle('forward');
                e.currentTarget.classList.toggle('right');
                forward.classList.toggle('left');
                forward.classList.toggle('forward');
                forward.classList.remove('appeared');
                left.classList.toggle('right');
                left.classList.toggle('left');
            }
        }
    }
}

class GoodCardsManager {
    
    subj_DOM_elem = document.createElement('div');
    containerToSubjectDE = null ;

    cardsContainer = document.createElement('div');
    /* ============================ */

    cards = [] ;
    
    getCards () {


        // fetch('http://moroz.dobolli.ru/php_handlers/addGoods.php' , {
        //             method: 'POST',
        //             body: formData
        //         }).then((result) => {
        //             return result.json();
        //         } ).then((json) => {
        //             console.log(json);
        //             form_elem.reset();

        //             input_to_file.removeAttribute('disabled') ;
        //             button_to_submit.removeAttribute('disabled');
                
        //         }) ;

        const options = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=to_landing' ,
        } ;

        fetch('./php_handlers/getGoods.php' , options).then(result => result.json()).then(data => {


            // alert(data.length);
            let cardPosition_class = ['forward' , 'left' , 'right'] ;
            let item_counter = 0 ;

            data.forEach(elem => {
                
                const attributes = {
                    imgSrc: elem.src , 
                    description: elem.description  ,
                    price: elem.salePrice 
                } ;
                
                this.cards[Symbol.for('card' + elem.id)] = new GoodCard(attributes);

                this.cards[Symbol.for('card' + elem.id)].subj_DOM_elem.classList.add(cardPosition_class[item_counter++]);

                this.cardsContainer.append(this.cards[Symbol.for('card' + elem.id)].subj_DOM_elem);
  
            });
            
            this.subj_DOM_elem.append(this.cardsContainer);
            console.log(data);
        });
    }

    constructor(containerToSubjectDE) {

        this.containerToSubjectDE = containerToSubjectDE ;

        this.subj_DOM_elem.className = 'good-cards-manager ' ;
        this.cardsContainer.className = 'cards-cotainer' ;

        containerToSubjectDE.append(this.subj_DOM_elem);

        this.getCards();  
    }
}

class MenuButton {

    subj_DOM_elem = document.createElement('div');

    menuButton = document.createElement('button');

    containerToSubjectDE = null ;

    targetToMenu = null ;

    constructor ({containerToSubjectDE , targetToMenu}) {

        this.targetToMenu = targetToMenu ;

        this.subj_DOM_elem.className = 'menuButton-container' ;
        this.menuButton.className = 'menu-button' ;

        this.menuButton.innerText = 'main menu' ;

        this.subj_DOM_elem.append(this.menuButton);

        this.containerToSubjectDE = containerToSubjectDE ;

        this.containerToSubjectDE.append(this.subj_DOM_elem);

        this.menuButton.onclick = () => {

            targetToMenu.classList.toggle('do');
        }
    }
}

export {

    GoodCardsManager , 
    MenuButton , 
}


