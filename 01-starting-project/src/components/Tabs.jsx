export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
    //const ButtonContainer = buttonsContainer;
    //ButtonContainer está recebendo a tag passada como props em Examples.jsx
    //buttonsContainer="menu" 
    return (
        <>
            <ButtonsContainer>
                {buttons}
            </ButtonsContainer>
            {children}
        </>
    );
}


//{ children, buttons, ButtonsContainer = "menu" }
//caso queria evitar o uso dessa props no componente, da pra definir o menu como tag 
//padrão do componente