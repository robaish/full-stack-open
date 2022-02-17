import React from 'react';
import { Icon, List, SemanticCOLORS } from 'semantic-ui-react';
import { Diagnosis, HealthCheckEntry } from '../types';

const HealthCheck = ({ entry, diagnosisArray }: {
  entry: HealthCheckEntry,
  diagnosisArray: Diagnosis[]
}) => {
  const setIconColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
        break;
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'grey';
        break;
    }
  };

  const iconColor: SemanticCOLORS = setIconColor();

  return (
    <div>
      <List key={entry.id}>
      <List.Content>
        <p>
          <Icon name={'circle'} color={iconColor} />
          <span><strong>{entry.date} | Health check </strong></span>
          <Icon name={'calendar alternate outline'} />
          <span> ⸻ {entry.description}</span>
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
    </div>
  );
};

export default HealthCheck;