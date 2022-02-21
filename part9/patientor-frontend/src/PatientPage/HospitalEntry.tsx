import React from 'react';
import { Divider, Icon, List, Segment } from 'semantic-ui-react';
import { Diagnosis, HospitalEntry } from '../types';

const Hospital = ({ entry, diagnosisArray }: {
  entry: HospitalEntry,
  diagnosisArray: Diagnosis[]
}) => {
  return (
    <div>
      <List key={entry.id}>
      <List.Content>
        <p>
          <Icon name={'circle'} color={'grey'} />
          <span><strong>{entry.date} | Hospital </strong></span>
          <Icon name={'hospital outline'} />
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
        <List.Content>
          <p><strong>Discharge:</strong></p>
          <List bulleted>
            <List.Item>
              Date: {entry.discharge.date}
            </List.Item>
            <List.Item>
              Criteria: {entry.discharge.criteria}
            </List.Item>
          </List>
        </List.Content>
      </Segment>
      }
    </List>
    <Divider />
    </div>
  );
};

export default Hospital;