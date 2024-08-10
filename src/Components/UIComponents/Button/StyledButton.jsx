import s from "./StyledButton.module.css"
export default function StyledButton({text,icon,tooltip,extraFunction,background}){
    function executeExtraFunction(){
        if(extraFunction){
            extraFunction()
        }
    }
    return <div data-tooltip={tooltip || text} className={s.button} style={{background}} onClick={executeExtraFunction}>
    <div className={s["button-wrapper"]}>
      <div className={s.text}>{text}</div>
        <span className={s.icon}>
          {icon || text}
        </span>
      </div>
    </div>
}