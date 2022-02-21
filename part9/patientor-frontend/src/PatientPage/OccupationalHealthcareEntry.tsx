import React from 'react';
import { Divider, Icon, List, Segment } from 'semantic-ui-react';
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
      <Segment basic>
        <List.Content style={{marginBottom: '1em'}}>
          <span><strong>Diagnostic codes:</strong></span>
          <List bulleted={true}>
            {entry.diagnosisCodes.map(code =>
            <List.Item key={code}>
              {code} {diagnosisArray.find(d => d.code === code)?.name}
              </List.Item>)}
          </List>
        </List.Content>
      </Segment>
      }
      <Divider />
    </List>
  );
};

export default Occupational;