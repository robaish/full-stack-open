import React from 'react';
import { Divider, Icon, List } from 'semantic-ui-react';
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
    </List>
    <Divider />
    </div>
  );
};

export default Hospital;