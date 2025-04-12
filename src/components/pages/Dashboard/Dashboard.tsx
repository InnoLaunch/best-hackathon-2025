import React, {FC, useEffect, useState} from 'react';
import './Dashboard.scss';
import BottomSheet from "../../common/BottomSheet/BottomSheet";





const Dashboard: FC = () => {
    const [open, setOpen] = useState(false);


    return (
        <>
            <button onClick={() => setOpen(true)}>Open Bottom Sheet</button>
            <BottomSheet open={open} setOpen={setOpen}>
                <h2>Title</h2>
                <p>Any scrollable content goes here...</p>
            </BottomSheet>
        </>
    );
};

export default Dashboard;