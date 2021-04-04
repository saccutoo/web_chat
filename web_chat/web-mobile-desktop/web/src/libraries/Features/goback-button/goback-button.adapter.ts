import { useHistory } from "react-router-dom";

function GoBackButtonAdapter(){
    const history = useHistory();

    const redirectToLastPage = () =>{
        history.goBack();
    }

    return {
        redirectToLastPage
    }
}

export default GoBackButtonAdapter;