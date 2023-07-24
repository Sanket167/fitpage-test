import { useState, useEffect } from 'react';
import { getData } from '../../api/axiosApi';
import { CONFIG } from '../../utils/config'
import { Link } from 'react-router-dom';
import TagElem from '../../components/TagElem.js';
import './style.css';

function Scan() {
    const [scanInfo, setscanInfo] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        fetchScanData();
    }, []);

    /**
     * Fetches data from node backend and update the state for scan data
     */
    const fetchScanData = async () => {
        let scanRes = await getData(CONFIG.API_URL);
        let scanData = scanRes.data
        console.log('scanData: ', scanData);
        if (!scanData) {
            setShowError(true)
        } else {
            setscanInfo(scanData);
        }
    }

    return (
        <div className="scan-section">
            {showError
                ? <h1 className='default-text'>No Data Fetched</h1>
                : <ul className="scan-ul headers">
                    {scanInfo.map((elem, idx) => {
                        return (
                            <li key={idx}>
                                <Link to="/subcriteria" state={{ scanElem: elem }}>
                                    <div>{elem.name}</div>
                                    <TagElem elem={elem} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    );
}

export default Scan;
