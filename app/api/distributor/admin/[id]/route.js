import { verifyJWT } from "@/app/lib/middlewares/verifyJWT";
import { DistributorService } from "@/app/lib/services/distributor.service";
import { OrderService } from "@/app/lib/services/order.service";
import { ApiResponse } from "@/app/lib/utils/apiResponse";

export async function GET(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") || 5;
    const page = searchParams.get("page") || 1;
    const distributor = await DistributorService.getDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    let history = await OrderService.getAllOrders({ orderBy: id, limit, page });
    return ApiResponse(
      200,
      { ...distributor, orders: history.orders, total: history.total },
      "Distributor fetched successfully",
    );
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error fetching distributor: " + error.message,
    );
  }
}

export async function PATCH(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body) {
      return ApiResponse(400, null, "Note content is required");
    }

    const distributor = await DistributorService.updateDistributor(id, body);
    return ApiResponse(200, distributor, "Distributor updated successfully");
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error updating distributor: " + error.message,
    );
  }
}

export async function DELETE(request, { params }) {
  const user = await verifyJWT();
  if (!user?.id) {
    return ApiResponse(401, null, "Unauthorized request");
  }
  try {
    const { id } = await params;
    const distributor = await DistributorService.deleteDistributor(id);
    if (!distributor) {
      return ApiResponse(404, null, "Distributor not found");
    }
    return ApiResponse(200, distributor, "Distributor deleted successfully");
  } catch (error) {
    return ApiResponse(
      500,
      null,
      "Error deleting distributor: " + error.message,
    );
  }
}
