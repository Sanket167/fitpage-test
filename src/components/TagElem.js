import { COLORS } from '../utils/constants'
function TagElem(props) {
    function getColorClass(color) {
        switch (color) {
            case COLORS.GREEN: return COLORS.GREEN;
            case COLORS.RED: return COLORS.RED;
            default: return COLORS.GREEN
        }
    }

    return (
        <div className={"subtext " + getColorClass(props.elem.color)} >{props.elem.tag}</div>
    )
}
export default TagElem;