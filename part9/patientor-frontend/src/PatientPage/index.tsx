import axios from 'axios';
import React, { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatientData, useStateValue } from '../state';
import { Patient } from '../types';

const PatientPage: React.FC = () => {
  const [{ patientData }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patientData).find(p => p.id === id);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
          );
        dispatch(setPatientData(patientDetailsFromApi));
      } catch (error) {
        console.log(error);
      }
    };
    
    if (!patient) {
      void fetchPatientDetails();
    }
  }, [dispatch]);

  if (!patient) {
    return null;
  }

  const setGenderIcon = (patient: Patient) => {
    switch (patient.gender) {
      case 'male':
        return 'mars';
        break;
      case 'female':
        return 'venus';
      default:
        return 'genderless';
        break;
    }
  };

  const iconName = setGenderIcon(patient);

  return (
    <>
      <div className="flex flex-ai-c">
        <Header as='h2' content={patient.name} />    
        <Icon name={iconName} size={'big'} style={{marginTop: '-0.1em', marginLeft: '0.25em'}}/>
      </div>
      <p style={{marginBottom: '0.25em'}}>ssn: {patient.ssn}</p>
      <p style={{marginBottom: '0.25em'}}>occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientPage;