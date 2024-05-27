import TransSubmit from "./TransSubmit";
import SameLevel from "./SameLevel";
import TranslationText from "./TranslationText";
import ExplainText1 from "./ExplainText1.js";
import HomeButton from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

export default function Main(){

    const handleTextChange = (text) => {
        localStorage.setItem('translatedText', text); // 입력된 값을 localStorage에 저장
    };

    return (
        <div>
            <HomeButton />
            <SiteLogo />
            <ExplainText1 />
            <SameLevel></SameLevel>
            <TranslationText onTextChange={handleTextChange} />
            <TransSubmit />
        </div>
    );
}