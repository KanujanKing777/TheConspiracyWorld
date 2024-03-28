import React, { useEffect } from 'react';
import './output.css';
import './output2.css';
function ExpertPage() {
    const categorieslist = [
        "Astrophysics", "Modern Physics", "Quantum Physics", "Biology", "Mathematics",
        "Genetics", "Medicine"
    ];

    return (
        <>
            <div className='funtableselect'>
                <div className='selectiontable'>
                    <p className="fundudede">Select your expertised fields</p>
                    <ul id='funfunfunxxx' class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">

                        {categorieslist.map((item, index) => (
                            <li style={{
                                margin: "1vh"
                            }} className='li' id={item.replace(" ", "")} key={index} onClick={() => {
                                document.getElementById(item.replace(" ", "")).innerText = '\u2713 ' + document.getElementById(item.replace(" ", "")).innerText;
                            }}>{item}</li>
                        ))}


                    </ul>
              
                    <p className="fundudede">Describe your talents to become an expert</p>
                    <textarea style={{
                        backgroundColor: "#353535",
                        padding: "1vh",
                        width: "95%",
                        margin: "2vh",
                        resize:"none"
                    }}>

                    </textarea>
                    <ul id='funfunfunxxx' class="*:rounded-full *:border  *:px-2 *:py-0.5 dark:text-sky-300  "
                        style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                    <li className='li' style={{
                        width:"95%",
                        borderRadius:"10px",
                        margin:"1vh",
                        textAlign:"center",
                        backgroundColor:"#052e16",
                        color:"white",
                        border:"1px solid #16a34a",
                        fontSize:"3.5vh"
                    }}>Submit</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ExpertPage;