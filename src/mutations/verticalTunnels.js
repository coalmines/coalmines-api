import uuid from 'uuid';

export const handleResponse = (response) => {
  const { error, success } = response;
  if (success) {
    const { id, name } = response.data;
    return { id, name };
  }
  if (error) {
    throw new Error(error);
  }
  return null;
};

export const tunnelService = {
  add: (_, { name }) => (
    {
      success: true,
      data: {
        id: uuid(),
        name,
      },
      error: 'Could not add this vertical tunnel',
    }
  ),
};

export const transformForTunnelService = a => a;

export const addVerticalTunnel = (obj, args, context) => {
  const response = tunnelService.add(
    context.user,
    transformForTunnelService(args),
  );
  return handleResponse(response);
};
