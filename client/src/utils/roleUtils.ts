/**
 * Format a role name for display (e.g., "super_admin" -> "Super Admin")
 * @param roleName The raw role name from the backend
 * @returns Formatted role name for display
 */
export const formatRoleName = (roleName: string): string => {
  if (!roleName) return '';
  
  // Split by underscore and capitalize each word
  return roleName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get the display name from a role object
 * @param role The role object which might contain a description with display name
 * @returns The display name or formatted role name
 */
export const getRoleDisplayName = (role: { name: string; description?: string }): string => {
  if (!role) return '';
  
  // Check if the description contains a display name
  if (role.description && role.description.includes('Display Name:')) {
    const match = role.description.match(/Display Name: ([^\n]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Fall back to formatting the role name
  return formatRoleName(role.name);
};