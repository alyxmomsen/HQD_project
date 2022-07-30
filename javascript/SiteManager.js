

class AddFileInteface {

    subj_DOM_elem = document.createElement('div');
    openTheInterFaceButton = document.createElement('button');
    formsContainer = document.createElement('div');

    constructor (targetObject) {

        this.formsContainer.className = 'forms-container' ;
        this.subj_DOM_elem.append(this.formsContainer);

        this.openTheInterFaceButton.innerText = 'add' ;
        this.openTheInterFaceButton.className = 'add-interface-button' ;

        this.subj_DOM_elem.append(this.openTheInterFaceButton);

        this.subj_DOM_elem.className = 'add-file-inteface' ;

        targetObject.subj_DOM_elem.append(this.subj_DOM_elem);

        this.openTheInterFaceButton.onclick = () => {

            const form_elem = document.createElement('form');
            form_elem.action = "./php_handlers/addGoods.php" ;
            form_elem.enctype = "msultipart/form-data" ;

            const input_to_file = document.createElement('input');
            input_to_file.name = 'alex-data' ;
            input_to_file.type = 'file' ;

            form_elem.append(input_to_file);

            const button_to_submit = document.createElement('button');
            button_to_submit.name = 'alex-button' ;
            button_to_submit.type = 'submit' ;
            button_to_submit.innerText = 'submit' ;  

            form_elem.append(button_to_submit);

            this.formsContainer.append(form_elem) ;

            button_to_submit.onclick = (e) => {

                e.preventDefault();

                const formData = new FormData(form_elem);
    
                fetch('./php_handlers/addGoods.php' , {
                    method: 'POST',
                    body: formData
                }).then((result) => {
                    return result.json();
                } ).then((json) => {
                    console.log(json);
                    form_elem.reset();

                    input_to_file.removeAttribute('disabled') ;
                    button_to_submit.removeAttribute('disabled');
                
                }) ;

                input_to_file.setAttribute('disabled' , 'true');
                button_to_submit.setAttribute('disabled' , 'true');
            }
        }
    }
}

class SiteManager {

    constructor () {

    }
}

export {

    SiteManager , 
    AddFileInteface
}