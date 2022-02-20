import React from 'react';
import { Divider, Icon, List } from 'semantic-ui-react';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';

const Occupational = ({ entry, diagnosisArray }: {
  entry: OccupationalHealthcareEntry,
  diagnosisArray: Diagnosis[]
}) => {
  return (
    <List key={entry.id}>
      <List.Content>
       <p> 
          <Icon name={'circle'} color={'grey'} />
          <span><strong>{entry.date} | Occupational </strong></span>
          <Icon name={'briefcase'} />
          <span>⸻ {entry.description}</span>
        </p>
      </List.Content>
      {entry.diagnosisCodes && 
      <List.Content>
        <span><em>Diagnostic codes:</em></span>
        <List bulleted={true}>
          {entry.diagnosisCodes.map(code =>
          <List.Item key={code}>
            {code} {diagnosisArray.find(d => d.code === code)?.name}
            </List.Item>)}
        </List>
      </List.Content>
      }
      <Divider />
    </List>
  );
};

export default Occupational;