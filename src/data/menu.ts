export type MenuCategory = 'Coffee' | 'Cold brews' | 'Pastries' | 'Brunch'

export type MenuItem = {
  name: string
  category: MenuCategory
  description: string
  price: string
  image: string
  tags?: string[]
}

export const menu: MenuItem[] = [
  { name: 'Honey oat flat white', category: 'Coffee', description: 'Double espresso, velvety oat milk, wildflower honey.', price: '$6', image: 'photo-1461023058943-07fcbe16d735', tags: ['Bestseller', 'Vegan'] },
  { name: 'Rose cardamom latte', category: 'Coffee', description: 'House rose syrup, green cardamom, a little ceremony.', price: '$6.5', image: 'photo-1570968915860-54d5c301fa9f', tags: ['Bestseller'] },
  { name: 'Single origin pour-over', category: 'Coffee', description: 'Rotating microlot, brewed slowly to bring out the good bits.', price: '$7', image: 'photo-1495474472287-4d71bcdd2085', tags: ['Seasonal'] },
  { name: 'Maple sea-salt mocha', category: 'Coffee', description: 'Stone-ground chocolate, local maple, a pinch of flaky salt.', price: '$6.5', image: 'photo-1517701550927-30cf4ba1dba5', tags: ['Bestseller'] },
  { name: 'Brown sugar shaken cold brew', category: 'Cold brews', description: '18-hour steep, brown sugar, a cool cloud of oat foam.', price: '$6.5', image: 'photo-1517701604599-bb29b565090c', tags: ['Bestseller', 'Vegan'] },
  { name: 'Citrus tonic espresso', category: 'Cold brews', description: 'Bright double espresso over sparkling yuzu tonic.', price: '$6', image: 'photo-1461023058943-07fcbe16d735', tags: ['Vegan'] },
  { name: 'Vanilla bean cream cold brew', category: 'Cold brews', description: 'Slow-steeped coffee with real vanilla sweet cream.', price: '$6.5', image: 'photo-1517701550927-30cf4ba1dba5' },
  { name: 'Strawberry matcha cloud', category: 'Cold brews', description: 'Ceremonial matcha, ripe strawberry, cold oat milk.', price: '$7', image: 'photo-1515823064-d6e0c04616a7', tags: ['Seasonal', 'Vegan'] },
  { name: 'Brown butter morning bun', category: 'Pastries', description: 'Laminated by hand, rolled in cinnamon sugar, gone by noon.', price: '$5.5', image: 'photo-1555507036-ab1f4038808a', tags: ['Bestseller'] },
  { name: 'Almond & apricot croissant', category: 'Pastries', description: 'Flaky layers, toasted almond frangipane, apricot jam.', price: '$6', image: 'photo-1530610476181-d83430b64dcd' },
  { name: 'Lemon olive oil cake', category: 'Pastries', description: 'Tender crumb, bright lemon, a little extra-virgin olive oil.', price: '$6', image: 'photo-1488477181946-6428a0291777', tags: ['Vegan'] },
  { name: 'Tahini chocolate cookie', category: 'Pastries', description: 'Dark chocolate puddles, nutty tahini, crisp golden edges.', price: '$4.5', image: 'photo-1499636136210-6f4ee915583e', tags: ['Bestseller'] },
  { name: 'Garden breakfast toast', category: 'Brunch', description: 'Whipped ricotta, peak-season tomatoes, herbs on sourdough.', price: '$14', image: 'photo-1525351484163-7529414344d8', tags: ['Seasonal'] },
  { name: 'Soft scramble & greens', category: 'Brunch', description: 'Pasture-raised eggs, lemony greens, toasted country loaf.', price: '$16', image: 'photo-1525351484163-7529414344d8' },
  { name: 'Wild mushroom grain bowl', category: 'Brunch', description: 'Crispy grains, roasted mushrooms, jammy egg, herb oil.', price: '$17', image: 'photo-1547592180-85f173990554', tags: ['Bestseller'] },
  { name: 'Pear & ricotta pancakes', category: 'Brunch', description: 'Cloud-soft pancakes, whipped ricotta, warm spiced pear.', price: '$15', image: 'photo-1528207776546-365bb710ee93', tags: ['Vegetarian'] },
]

export const categories: MenuCategory[] = ['Coffee', 'Cold brews', 'Pastries', 'Brunch']