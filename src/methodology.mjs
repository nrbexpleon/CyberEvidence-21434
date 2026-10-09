export const LEVELS = ['negligible','moderate','major','severe'];
export const FEASIBILITY = ['high','medium','low','very-low'];
const impactValue = x => Math.max(1, LEVELS.indexOf(x) + 1);
const feasibilityValue = x => ({'very-low':1,low:2,medium:3,high:4}[x] || 1);

export function calculateRisk({impact, feasibility}) {
  const score = impactValue(impact) * feasibilityValue(feasibility);
  const rating = score >= 12 ? 'CRITICAL' : score >= 8 ? 'HIGH' : score >= 4 ? 'MEDIUM' : 'LOW';
  return {score,rating};
}

export function validateProject(input) {
  const errors=[];
  if(!input?.name?.trim()) errors.push('Project name is required.');
  if(!input?.item?.trim()) errors.push('Cybersecurity item is required.');
  if(!input?.boundary?.trim()) errors.push('Item boundary is required.');
  if(!input?.owner?.trim()) errors.push('Cybersecurity owner is required.');
  return errors;
}

export function validateScenario(input) {
  const errors=[];
  for(const k of ['title','asset','damage','threat','attackPath']) if(!input?.[k]?.trim()) errors.push(`${k} is required.`);
  if(!LEVELS.includes(input?.impact)) errors.push('Valid impact is required.');
  if(!FEASIBILITY.includes(input?.feasibility)) errors.push('Valid feasibility is required.');
  return errors;
}

export function evaluateProject(project, now=new Date()) {
  const findings=[];
  const scenarios=project.scenarios||[], goals=project.goals||[], evidence=project.evidence||[];
  if(!project.assets?.length) findings.push({severity:'high',area:'Item definition',title:'No assets identified',action:'Identify assets and cybersecurity properties.'});
  if(!scenarios.length) findings.push({severity:'high',area:'Risk assessment',title:'No threat scenarios',action:'Perform a structured threat analysis and risk assessment.'});
  const untreated=scenarios.filter(s=>['CRITICAL','HIGH'].includes(s.risk.rating)&&!['REDUCE','AVOID','TRANSFER','ACCEPT'].includes(s.treatment));
  if(untreated.length) findings.push({severity:'critical',area:'Risk treatment',title:`${untreated.length} high/critical scenarios lack treatment`,action:'Assign an approved treatment and owner.'});
  const unlinkedGoals=goals.filter(g=>!g.scenarioIds?.length);
  if(unlinkedGoals.length) findings.push({severity:'medium',area:'Traceability',title:`${unlinkedGoals.length} goals have no threat link`,action:'Trace each goal to one or more scenarios.'});
  const goalEvidence=new Map(goals.map(g=>[g.id,evidence.filter(e=>e.goalIds?.includes(g.id))]));
  const goalsWithoutEvidence=goals.filter(g=>!(goalEvidence.get(g.id)||[]).length);
  if(goalsWithoutEvidence.length) findings.push({severity:'high',area:'Evidence',title:`${goalsWithoutEvidence.length} goals lack evidence`,action:'Attach objective evidence to each cybersecurity goal.'});
  const stale=evidence.filter(e=>e.validUntil && new Date(e.validUntil)<now);
  if(stale.length) findings.push({severity:'medium',area:'Evidence',title:`${stale.length} evidence records are expired`,action:'Refresh or formally retire expired evidence.'});
  const open=project.reviews?.filter(r=>r.disposition==='REWORK').length||0;
  const treated=scenarios.filter(s=>s.treatment).length;
  const metrics={
    scenarios:scenarios.length, highCritical:scenarios.filter(s=>['CRITICAL','HIGH'].includes(s.risk.rating)).length,
    treated, treatmentCoverage:scenarios.length?Math.round(treated/scenarios.length*100):0,
    goals:goals.length, evidence:evidence.length, evidenceCoverage:goals.length?Math.round((goals.length-goalsWithoutEvidence.length)/goals.length*100):0,
    expiredEvidence:stale.length, openRework:open
  };
  const blockers=findings.filter(f=>f.severity==='critical'||f.severity==='high').length;
  const status=blockers?'GAPS_IDENTIFIED':(scenarios.length&&goals.length&&evidence.length?'READY_FOR_REVIEW':'IN_PROGRESS');
  return {generatedAt:now.toISOString(),status,metrics,findings,disclaimer:'Engineering decision support only; not an ISO/SAE 21434 certification or legal opinion.'};
}
