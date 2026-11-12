import initialTreesData from '@/data/trees.json';
import { Tree, CareReport } from './types';

const STORAGE_KEY = 'climate_cardinals_trees_v3';

export function getAllTrees(): Tree[] {
  if (typeof window === 'undefined') {
    return initialTreesData as unknown as Tree[];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading trees:', e);
  }

  return initialTreesData as unknown as Tree[];
}

export function getTreeById(id: string): Tree | undefined {
  const trees = getAllTrees();
  return trees.find(t => t.id.toLowerCase() === id.toLowerCase() || t.code.toLowerCase() === id.toLowerCase());
}

export function saveTrees(trees: Tree[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
    window.dispatchEvent(new Event('trees-updated'));
  } catch (e) {
    console.error('Error saving trees:', e);
  }
}

export function adoptTree(treeId: string, donorName: string, donorMessage?: string): Tree | null {
  const trees = getAllTrees();
  const index = trees.findIndex(t => t.id.toLowerCase() === treeId.toLowerCase());

  if (index === -1) return null;

  const targetTree = { ...trees[index] };
  targetTree.status = 'Sudah Diadopsi';
  targetTree.donorName = donorName;
  targetTree.donorMessage = donorMessage || 'Turut menjaga masa depan bumi.';
  targetTree.adoptedDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  trees[index] = targetTree;
  saveTrees(trees);
  return targetTree;
}

export function addTree(tree: Tree): Tree {
  const trees = getAllTrees();
  const updated = [tree, ...trees];
  saveTrees(updated);
  return tree;
}

export function addCareReport(treeId: string, report: CareReport): Tree | null {
  const trees = getAllTrees();
  const index = trees.findIndex(t => t.id.toLowerCase() === treeId.toLowerCase());

  if (index === -1) return null;

  const targetTree = { ...trees[index] };
  targetTree.reports = [report, ...(targetTree.reports || [])];

  if (report.heightCm) {
    targetTree.currentHeightCm = report.heightCm;
  }

  trees[index] = targetTree;
  saveTrees(trees);
  return targetTree;
}
