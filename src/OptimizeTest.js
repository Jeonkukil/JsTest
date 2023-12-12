import React, { useState, useEffect } from "react";

/// 목적은 memo를 통해서 컴포넌트가 중복호출되는걸 방지하는걸 목표로 한다.
const Textview = React.memo(
    ({text}) => {
        useEffect(() => {
            console.log(`update :: Text : ${text}`);
        })
        return <div>{text}</div>
    }
)


const Countview = React.memo(
    ({count}) => {
        useEffect(() => {
            console.log(`count :: count ${count}`);
        })
        return <div>{count}</div>
    }
)


const CountA = React.memo(
    ({count2}) => {

        useEffect(()=>{
            console.log(`CounterA update - count: ${count2}`)
        })

        /*
        콘솔찍으면 countA는 useState로 1을 지정했기에 로그가 나오지 않는다.
        */
        return <div>{count2}</div>
    }
)


const CountB = React.memo(
    ({obj}) => {
 /*
        콘솔찍으면 countㅠ는 useState로 1을 지정했지만 로그가 나온다?
        JS 에서는 객체, 함수같은 비원시 타입의자료는 값의 비교가 아닌 주소의 비교인
        얕은비교를 하기때문에 useState를 1로 지정해도 다른 주소에 있기에 다르다고 판단
        로그에 찍힌다 이런 미친 씨발...
        ex)
        let a = {count: 1};
        let b = {count: 1};

        if (a === b) {
            console.log("참")
        } else {
            console.log("거짓")
        }

        결과는 거짓
        */
        useEffect(() => {
            console.log(`CounterB update - count: ${obj.count2}`)
        })

        return <div>{obj.count2}</div>
    }

);

const areEqual = (prevProps, nextProps) => {
    // return true // 이전 프롭스 현재 프롭스 같다 => 리렌더링 X
    // return false // 이전 프로습 현재 프롭스 다르다 = > 리렌더링 O

    if (prevProps.obj.count2 === nextProps.obj.count2) {
        return true;
    } 
    return false;
}

const MemoizedCounterB = React.memo(CountB, areEqual);

const OptimaizeTest = () => {
    /// 카운트, 텍스트 상태
    const [count , setCount] = useState(1);
    const [text, setText] = useState("");


    ///
    const [count2, setCount2] = useState(1);
    const [obj, setObj] = useState({
        count2: 1
    })

    return <div style={{padding: 50 }}>
        <div>
            <h2>Count</h2>
            <Countview count={count}></Countview>
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
        <div>
            <h2>text</h2>
            <Textview text={text}></Textview>
            <input value={text} onChange={(e) => setText(e.target.value)}></input>
        </div>
        <br/>
        <div>
            <h2>Count A</h2>
            <CountA count2={count2}></CountA>
            <button onClick={() => setCount2(count2)}>A button</button>
        </div>
        <div>
            <h2>Count B</h2>
            <MemoizedCounterB obj = {obj}></MemoizedCounterB>
            {/* <CountB obj={obj}></CountB> */}
            <button onClick={() => setObj({
                count2: obj.count2
            })}>B button</button>
        </div>
    </div>
};

export default OptimaizeTest;