import React, { useEffect } from 'react';
import { useState } from "react";
import Description from "../components/Description";
import Container from '@mui/material/Container';
import Instructions from "../components/Instructions";
import content from "../../public/content.json";
import TextCard from "../components/TextCard";
import MultipleChoice from "../components/MultipleChoice";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { addPoint, noPoint } from "../features/score/scoreSlice";
import Timer from "../components/Timer";
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import SectionCard from "../components/SectionCard";
import parse from 'html-react-parser';
import TrueOrFlase from "../components/TrueOrFalse";
import { green } from '@mui/material/colors';
import CopyButton from "../components/FillinTheBlanks/CopyButton";
import WordBox from "../components/FillinTheBlanks/WordBox";
import Blank from "../components/FillinTheBlanks/Blank";
import JsxParser from 'react-jsx-parser'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Part3Text from "../components/FillinTheBlanks/Part3Text";
import DrDr from "../components/DragDrop/DrDr";
import ExerciseRow from '../components/Grid/ExerciseRow';
import ExerciseTable from '../components/Grid/ExerciseTable';
import DropMenu from '../components/Drop/DropMenu';
import Part5 from '../components/Drop/Part5';





function Reading() {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.point.points);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (id, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
  };
  const handleSubmit = () => {

    setIsSubmitted(true);

  };



  const set1 = [];

  for (let i = 0; i < 6; i++) {
    set1.push(
    

      <Container key={i} maxWidth="sm" sx={{ px: 2 }}>
          <Stack spacing={2} >
        <TextCard text={parse(content.test1.reading.part1[i].text)} />
        <MultipleChoice
        id={i}
          question={content.test1.reading.part1[i].question}
          choiceA={content.test1.reading.part1[i].choices.a}
          choiceB={content.test1.reading.part1[i].choices.b}
          choiceC={content.test1.reading.part1[i].choices.c}
          answer={content.test1.reading.part1[i].choices.answer}
          submitted={isSubmitted}
        />
        </Stack>
      </Container>
    );
  }

const set2 = []
for (let i=0; i < 8; i++){
  set2.push(
  <Container key={i} maxWidth="sm" sx={{ px: 0 }}>
  <Stack  sx={{m:2}} >
    <TextCard text={content.test1.reading.part2[i].question}/>
    <TrueOrFlase submitted={isSubmitted} answer={content.test1.reading.part2[i].answer} id={i}/>
  </Stack>
    </Container>
    
    );
  
}


  const [isReset, setIsReset] = useState(false);
  const [isReset2, setIsReset2] = useState(false);


  const handleReset = () => {
    // setIsReset((prevState) => !prevState );
    setIsReset(true)
    setTimeout(() => {
      setIsReset(false);
    }, 2000); 
  };



  const handleReset2 = () => {
    setIsReset2(true);
    setTimeout(() => {
      setIsReset2(false);
    }, 2000); 
    
  };

  const rows = [<ExerciseRow id={"0"}  example={content.test1.reading.part4.choices[0]} submitted={isSubmitted} sentence={content.test1.reading.part4.sentences[0]}/>]
  for (let i=1; i < 8; i++){
    rows.push(
    <ExerciseRow id={i} submitted={isSubmitted}  reset={isReset2} answer={content.test1.reading.part4.choices[i]} sentence={content.test1.reading.part4.sentences[i]}/>)


  }

  return (
    <>
    
    
      <Container maxWidth="md">
      <h2 style={{textAlign:"center"}}>{content.test1.reading.title}</h2>
      <h5 style={{textAlign:"center"}}>{parse(content.test1.reading.description)}</h5>
      <Timer minutes={45}/>
        <Instructions text={content.test1.reading.part1.instructions} />
        <p style={{fontSize:"0.75em"}}>{content.scoreValue[1]}</p>
        <SectionCard>
        
        <Stack spacing={2} sx={{my: 5}}>
        
        {set1}
        </Stack>
        </SectionCard>

       
        <Instructions text={content.test1.reading.part2.instructions} />
        <p style={{fontSize:"0.75em"}}>{content.scoreValue[1]}</p>

        <SectionCard>
        <Container maxWidth="sm" sx={{ px: 2 }}>

          <Stack sx={{alignContent:"center"}}>
        <p style={{textAlign:"center", fontWeight:500}}>{content.test1.reading.part2.title}</p>
       {parse(content.test1.reading.part2.text)}
        </Stack>
        {set2}
        </Container>
        </SectionCard>
      <Instructions text={content.test1.reading.part3.instructions} />
      <p style={{fontSize:"0.75em"}}>{content.scoreValue[1]}</p>

      <SectionCard>
      <Stack sx={{alignContent:"center"}}>
      <WordBox textArray={Object.values(content.test1.reading.part3.choices)} isReset={isReset} submitted={isSubmitted}/>
 
      <Container 
      maxWidth="md"
      sx={{  }}
      >
      <p style={{textAlign:"center", fontWeight:500}}>{content.test1.reading.part3.title}</p>

        <div style={{fontSize:"1em", padding:"1em"}}>   
          <Part3Text isSubmitted={isSubmitted} isReset={isReset}/>
          <div style={{textAlign:"right"}}>
          <button onClick={handleReset} style={{border:"none", borderRadius: '5px',
            boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',}} className="paper" disabled={isSubmitted}>
          <RestartAltIcon />
          </button>
          </div>
          </div>

        
        </Container>
        </Stack>
        </SectionCard>
        <Instructions text={content.test1.reading.part4.instructions}  />
        {/* <Instructions text={content.test1.reading.part3.instructions2}/> */}
        <p style={{fontSize:"0.75em"}}>{content.scoreValue[1]}</p>

   
        <Stack sx={{alignContent:"center"}}>
        <SectionCard>
        <Container sx={{}}>
        <WordBox textArray={Object.values(content.test1.reading.part4.choices)} isReset={isReset2} submitted={isSubmitted}/>
        <p style={{textAlign:"center", fontWeight:500}}>{content.test1.reading.part4.title}</p>

        <ExerciseTable rows={rows}/>
        <div style={{textAlign:"right", padding:"5px"}}>
        <button onClick={handleReset2} style={{border:"none", borderRadius: '5px',
            boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',}} className="paper" disabled={isSubmitted}>
          <RestartAltIcon />
          </button>
          </div>
        </Container>
        </SectionCard>
        </Stack>
        <Instructions text={content.test1.reading.part5.instructions} />
        <p style={{fontSize:"0.75em"}}>{content.scoreValue[0.5]}</p>

      <SectionCard>
      <Container sx={{}}>
        <Part5 submitted={isSubmitted}/>
       </Container>
        </SectionCard>
        <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
  {!isSubmitted && (
    <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:green[500], textAlign:"center", fontWeight: "bold", m:3}}>Oblicz wynik</Button> 
  )}
  {isSubmitted && (<h3>{points}/30</h3>)}
</div>


      </Container>
     
    </>
  );
}

export default Reading;
