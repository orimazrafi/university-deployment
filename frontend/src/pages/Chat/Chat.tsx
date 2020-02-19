import React from "react";
import { useHistory } from "react-router-dom";
export const Chat = () => {
    const history: any = useHistory();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Chat!</h2>
                <h4>

                    you are user-{history.location.state.studentId}
                </h4>
                <h4>

                    chat on course number - {history.location.state.courseId}
                </h4>
            </div>
        </div>
    )
}