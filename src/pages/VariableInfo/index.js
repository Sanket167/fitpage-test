import { useLocation } from 'react-router-dom';
import { SCAN_TYPE } from '../../utils/constants'
function VariableInfo(props) {
    const location = useLocation();
    let { variableInfo } = location.state;

    /**
     * Return ui based on the type of criteria
     * IF type = value, render values array in list
     * IF type = indicator, render the parameter ui with default value
     * @param {*} variableInfo 
     * @returns 
     */
    function getVariableValuesMapping(variableInfo) {
        switch (variableInfo?.type) {
            case SCAN_TYPE.VALUE:
                return (
                    <ul className="variable-section">
                        {variableInfo.values.map((elem, idx) => {
                            return (
                                <li key={idx} className='default-text variable-li'>{elem}</li>
                            )
                        })}
                    </ul>
                )
            case SCAN_TYPE.INDICATOR:
                return (
                    <div>
                        <div className="margin-btm-10 indicator-header">{variableInfo?.study_type || ""}</div>
                        <div className="margin-btm-10 indicator-sub-header">Set Parameters</div>
                        <div className="indicator-variable-section">
                            <div className="left">{variableInfo?.parameter_name || ""}</div>
                            <input name="" max={variableInfo?.max_value || 0} min={variableInfo?.min_value || 0} defaultValue={variableInfo?.default_value || 0} className="right" />
                        </div>
                    </div>
                )
            default: return (<h3 className='default-text'>No values present</h3>)
        }
    }

    return (
        <div className="scan-section">
            {getVariableValuesMapping(variableInfo)}
        </div>
    );
}

export default VariableInfo;
