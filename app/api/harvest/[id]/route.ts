import { NextRequest, NextResponse } from "next/server";
// import { Harvest } from '@/lib/models/harvest'; // placeholder

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // const harvest = await Harvest.findById(id);
    const harvest = { id, mock: true };

    return NextResponse.json(harvest, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { harvestAmount, harvestType, harvestDate } = body;

    if (!harvestAmount || !harvestType || !harvestDate) {
      return NextResponse.json(
        { message: "Fill out all required fields" },
        { status: 400 }
      );
    }

    const { id } = params;
    // const result = await Harvest.findByIdAndUpdate(id, body);
    const result = { id, updated: true }; // mock

    return NextResponse.json(
      { message: "Harvest updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // const result = await Harvest.findByIdAndDelete(id);
    const result = { id, deleted: true }; // mock

    return NextResponse.json(
      { message: "Harvest deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
