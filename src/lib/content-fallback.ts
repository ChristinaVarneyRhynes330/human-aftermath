import fs from 'fs';
import path from 'path';

export function getCurriculum() {
  try {
    const p = path.join(process.cwd(), 'content', 'curriculum.json');
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading curriculum.json:', e);
  }
  return [];
}

export function getMediaRegistry() {
  try {
    const p = path.join(process.cwd(), 'content', 'media_registry.json');
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading media_registry.json:', e);
  }
  return {};
}

export function getLabActivities() {
  const labDir = path.join(process.cwd(), 'content', 'lab');
  const activities: Array<{ slug: string; type: string; title: string; definition: any }> = [];

  try {
    const scenariosPath = path.join(labDir, 'scenarios.json');
    if (fs.existsSync(scenariosPath)) {
      const items = JSON.parse(fs.readFileSync(scenariosPath, 'utf-8'));
      items.forEach((item: any) => activities.push({ slug: item.slug, type: 'scenario', title: item.title, definition: item }));
    }

    const simPath = path.join(labDir, 'sim_scenarios.json');
    if (fs.existsSync(simPath)) {
      const items = JSON.parse(fs.readFileSync(simPath, 'utf-8'));
      items.forEach((item: any) => activities.push({ slug: item.slug, type: 'scenario', title: item.title, definition: item }));
    }

    const claimsPath = path.join(labDir, 'claim_labs.json');
    if (fs.existsSync(claimsPath)) {
      const items = JSON.parse(fs.readFileSync(claimsPath, 'utf-8'));
      items.forEach((item: any) => activities.push({ slug: item.slug, type: 'claim_lab', title: item.title, definition: item }));
    }

    const classifyPath = path.join(labDir, 'classify.json');
    if (fs.existsSync(classifyPath)) {
      const items = JSON.parse(fs.readFileSync(classifyPath, 'utf-8'));
      items.forEach((item: any) => activities.push({ slug: item.slug, type: 'classify', title: item.title, definition: item }));
    }

    const explainPath = path.join(labDir, 'explain.json');
    if (fs.existsSync(explainPath)) {
      const items = JSON.parse(fs.readFileSync(explainPath, 'utf-8'));
      items.forEach((item: any) => activities.push({ slug: item.slug, type: 'explain_options', title: item.title, definition: item }));
    }
  } catch (e) {
    console.error('Error loading lab activities:', e);
  }

  return activities;
}
